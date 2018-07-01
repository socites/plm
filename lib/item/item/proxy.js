function ItemProxy(item, id, session) {
    "use strict";

    let initialised;
    Object.defineProperty(item, 'initialised', {
        'get': function () {
            return !!initialised;
        }
    });

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

    Object.defineProperty(this, 'session', {
        'get': function () {
            return session;
        }
    });

    Object.defineProperty(item, 'id', {
        'get': function () {
            return base.id;
        }
    });
    Object.defineProperty(item, 'instanceId', {
        'get': function () {
            return base.instanceId;
        }
    });

    Object.defineProperty(this, 'data', {
        'get': function () {
            return base.data;
        }
    });

    let maps = new ItemMaps(this, item, base.data);
    Object.defineProperty(this, 'maps', {
        'get': function () {
            return maps;
        }
    });

    Object.defineProperty(item, 'properties', {
        'get': function () {
            return [...maps.keys];
        }
    });

    Object.defineProperty(item, 'processing', {
        'get': function () {
            return base.fetching || base.publishing || base.removing;
        }
    });

    // Expose bind and unbind for handling events
    let events = new ItemEvents(item, this, base, maps);

    maps.triggerChange = events.bindings.change.trigger;

    Object.defineProperty(item, 'loaded', {
        'get': function () {
            return base.loaded;
        }
    });
    Object.defineProperty(item, 'updating', {
        'get': function () {
            return base.updating;
        }
    });
    Object.defineProperty(item, 'fetching', {
        'get': function () {
            return base.fetching;
        }
    });
    Object.defineProperty(item, 'fetched', {
        'get': function () {
            return base.fetched;
        }
    });
    Object.defineProperty(item, 'publishing', {
        'get': function () {
            return base.publishing;
        }
    });
    Object.defineProperty(item, 'published', {
        'get': function () {
            return base.published;
        }
    });


    Object.defineProperty(item, 'ERRORS', {
        'get': function () {
            return base.ERRORS;
        }
    });
    Object.defineProperty(item, 'error', {
        'get': function () {
            return base.error;
        }
    });

    Object.defineProperty(this, 'unpublished', {
        'get': function () {
            return base.unpublished;
        }
    });

    Object.defineProperty(this, 'isUnpublished', {
        'get': function () {
            return base.isUnpublished;
        }
    });

    // Expose updated object
    item.updated = base.updated;

    item.toJSON = base.toJSON;

    let getters = new ItemGetters(item);
    Object.defineProperty(item, 'getters', {
        'get': function () {
            return getters.values;
        }
    });

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

        console.log(data);
        console.log(base);
        window.asd = base;

        onLoaded(data);

    };

    // Expose fetch and load methods
    item.fetch = function () {

        return new Promise(function (resolve, reject) {

            base.fetch(session).then(function () {
                (onLoaded()) ? resolve() : reject('Error loading item');
            });

        });

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
    function publish(params) {
        return base.publish(params, session);
    }

    this.publish = publish;
    item.publish = publish;

    // Expose the remove method
    function remove(params) {
        return base.remove(params, session);
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
