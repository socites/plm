function ItemProxy(item, id, session) {
    'use strict';

    let initialised;
    Object.defineProperty(item, 'initialised', {'get': () => !!initialised});

    // Get collection base from the factory
    let registry = module.registries.items.get(item.constructor);
    if (!registry) {
        let message = 'Item is not registered';
        console.error(message, item);
        throw new Error(message);
    }
    let base = registry.factory.get(id);

    if (session && !registry.auth) {
        console.warn('Authentication is not supported in this item. ' +
            'Session is going to be discarded.', item);
        session = undefined;
    }

    Object.defineProperty(this, 'session', {'get': () => session});

    Object.defineProperty(item, 'id', {'get': () => base.id});
    Object.defineProperty(item, 'instanceId', {'get': () => base.instanceId});

    Object.defineProperty(this, 'data', {'get': () => base.data});

    let maps = new ItemMaps(this, item, base.data);
    Object.defineProperty(this, 'maps', {'get': () => maps});

    Object.defineProperty(item, 'properties', {'get': () => [...maps.keys]});

    Object.defineProperty(item, 'processing', {'get': () => base.fetching || base.publishing || base.removing});

    // Expose bind and unbind for handling events
    let events = new ItemEvents(item, this, base, maps);

    maps.triggerChange = events.bindings.change.trigger;

    Object.defineProperty(item, 'loaded', {'get': () => base.loaded});
    Object.defineProperty(item, 'updating', {'get': () => base.updating});
    Object.defineProperty(item, 'fetching', {'get': () => base.fetching});
    Object.defineProperty(item, 'fetched', {'get': () => base.fetched});
    Object.defineProperty(item, 'publishing', {'get': () => base.publishing});
    Object.defineProperty(item, 'published', {'get': () => base.published});
    Object.defineProperty(item, 'removing', {'get': () => base.removing});

    Object.defineProperty(item, 'isUnpublished', {'get': () => base.data.isUnpublished});
    Object.defineProperty(item, 'unpublished', {'get': () => base.data.unpublished});


    Object.defineProperty(item, 'ERRORS', {'get': () => base.ERRORS});
    Object.defineProperty(item, 'error', {'get': () => base.error});

    Object.defineProperty(this, 'unpublished', {'get': () => base.unpublished});
    Object.defineProperty(this, 'isUnpublished', {'get': () => base.isUnpublished});

    // Expose updated object
    item.updated = base.updated;

    item.toJSON = base.toJSON;

    let getters = new ItemGetters(item);
    Object.defineProperty(item, 'getters', {'get': () => getters.values});

    let self = this;

    function onLoaded(data) {

        base.unbind('loaded', onLoaded);

        if (!base.loaded && !data) {
            console.warn('Item is not loaded, and data not received');
            return;
        }

        // Execute onLoaded to initialise the item when the data is received from cache or server
        if (!initialised && typeof self.onLoaded === 'function') {

            let processed;

            try {
                processed = self.onLoaded(data);
            }
            catch (exc) {
                console.error(exc.stack);
                processed = false;
            }

            processed = (typeof processed === 'boolean') ? processed : true;

            if (!processed) {
                console.warn(`Item was not initialise, cleaning cache "${base.cache.storageId}"`, data);
                base.cache.clean();
                return false;
            }

        }

        if (!data) {
            return;
        }

        // Set the data to the item
        try {
            base.data.set(data);
        }
        catch (exc) {
            console.log(exc.stack);
            base.error = base.ERRORS.INVALID_RESPONSE;
            base.events.trigger('change', base.instanceId);
            return false;
        }

        if (!base.loaded) {
            base.loaded = true;
            base.events.trigger('loaded');
        }

        base.events.trigger('change', base.instanceId);
        base.events.trigger('updated');

        return true;

    }

    // To initialise all the items
    base.events.bind('loaded', onLoaded);

    /**
     * Used when the item is searched, by instance, when a relation if found by the fields from and to.
     *
     * @param data
     */
    this.set = function (data) {

        if (base.id) {
            throw new Error('Item already set');
        }

        if (!data.id) {
            let message = 'Item data id not set';
            console.error(message, data);
            throw new Error(message);
        }

        if (!base.id) {

            base.events.unbind('loaded', onLoaded);
            base.destroy();

            base = registry.factory.get(data.id);

            maps.data = base.data;

            item.updated = base.updated;
            item.toJSON = base.toJSON;

        }

        base.fetched = true;

        onLoaded(data);

    };

    // Expose fetch and load methods
    item.fetch = async function () {
        let data = await base.fetch(session);
        onLoaded(data);
    };

    item.update = function () {
        return base.update(session);
    };

    function loadItems(specs) {

        for (let name of maps.keys) {

            let property = maps.get(name);
            if (!property.Item) continue;

            if (specs[name]) {
                item[name].load(specs[name]);
            }

        }

    }

    // item.load can be overwritten
    function load(params) {

        return new Promise(function (resolve, reject) {

            // Load from cache if item is not loaded
            if (base.id && !base.loaded && !base.published) {

                let data = base.cache.load();
                if (data) {
                    onLoaded(data);
                }

            }

            base.load(params, session).then(function (response) {

                if (response.data) {

                    if (onLoaded(response.data)) {

                        // Continue loading the rest of the items
                        loadItems(response.specs);

                    } else {
                        reject('Error loading item');
                    }

                }

                resolve(response.specs);

            });

        });

    }

    item.load = load;
    this.load = load;


    // Expose the publish method
    function publish(specs) {

        if (specs && typeof specs !== 'object') {
            throw new Error('Invalid parameters');
        }

        specs = (specs) ? specs : {};
        let _session = (specs.session) ? specs.session : session;

        return base.publish(_session);

    }

    this.publish = publish;
    item.publish = publish;

    // Expose the remove method
    function remove(specs) {

        if (typeof specs !== 'object') {
            throw new Error('Invalid parameters');
        }

        specs = (specs) ? specs : {};
        let _session = (specs.session) ? specs.session : session;

        return base.remove(_session);

    }

    this.remove = remove;
    item.remove = remove;

    this.initialise = function (specs) {

        if (typeof specs !== 'object' || !(specs.fields instanceof Array) || typeof specs.maps !== 'object') {
            console.error('Invalid parameter', specs);
            throw new Error('Invalid parameter');
        }

        if (!base.initialised) {
            base.initialise({'fields': specs.fields});
        }

        maps.define(specs.maps, specs.fields);

        // Once fields and maps are set, then initialise the getters
        getters.initialise(maps);

        initialised = true;

    };

}
