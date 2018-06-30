function ItemMaps(proxy, item, data) {
    "use strict";

    let initialised;
    Object.defineProperty(this, 'initialised', {
        'get': function () {
            return !!initialised;
        }
    });

    // active is true when at least one consumer is bound to the 'change' event.
    // In this case properties of the item that are other items, must be updated when
    // the item is updated.
    let active;
    Object.defineProperty(this, 'active', {
        'get': function () {
            return !!active;
        },
        'set': function (value) {
            active = !!value;
            updatePropertiesItems();
        }
    });

    let triggerChange;
    Object.defineProperty(this, 'triggerChange', {
        'get': function () {
            return triggerChange;
        },
        'set': function (value) {
            triggerChange = value;
        }
    });

    let NOTSET = module.NOTSET;

    // The specifications of the properties maps registered in the item
    let maps = new Map();
    Object.defineProperty(this, 'keys', {
        'get': function () {
            return maps.keys();
        }
    });
    Object.defineProperty(this, 'values', {
        'get': function () {
            return maps.values();
        }
    });

    // The items instances
    let items = new Map();

    /**
     * Register a property of the item as a map to a data source
     *
     * @param property {string} The name of the property
     * @param specs {string | object} The specifications of the property.
     * If string is passed, it defines the source of the property.
     * @param fields {Array} used to check that the property source exists.
     */
    function register(property, specs, fields) {

        specs = (typeof specs === 'string') ? specs = {'source': specs} : specs;

        if (typeof property !== 'string' || typeof specs !== 'object') {
            throw new Error('Invalid parameters');
        }

        let source = specs.source;
        let Item = specs.Item;
        let readOnly = (typeof specs.readOnly !== 'boolean') ? false : specs.readOnly;
        let immutable = specs.immutable;

        if (typeof source !== 'string') {
            throw new Error('Invalid parameters');
        }

        if (fields.indexOf(source) === -1) {
            console.error(`Property "${property}" maps to an undefined source "${source}"`, fields);
            return;
        }

        maps.set(property, specs);

        function getProperty() {

            // If the property is an Item.
            if (Item) {
                updatePropertyItem(property, specs);
                return items.get(property);
            }

            return data[source];

        }

        function setProperty(value) {

            if (immutable && typeof data[source] !== 'undefined' && data[source] !== NOTSET) {
                throw new Error(`Property "${source}" cannot be changed`);
            }
            if (readOnly) {
                throw new Error(`Property "${source}" is read only`);
            }

            data[source] = (typeof value === 'object') ? value.id : value;

        }

        if (proxy.hasOwnProperty(property) || item.hasOwnProperty(property)) {
            console.error(`Property "${property}" is already defined in the item or proxy.`, proxy, item);
            return;
        }

        Object.defineProperty(proxy, property, {'get': getProperty, 'set': setProperty});
        Object.defineProperty(item, property, {'get': getProperty, 'set': setProperty});

    }

    function updatePropertyItem(property, specs) {

        if (!specs.Item) {
            return;
        }

        let source = specs.source;

        let linked; // The item linked as a property of the current item.
        if (items.has(property)) {
            linked = items.get(property);
        }

        // If the property of the linked item is set
        if (data[source]) {

            if (!linked) {
                linked = new specs.Item(data[source]);
            }
            else if (linked.id !== data[source]) {
                linked.unbind('change', triggerChange);
                linked = new specs.Item(data[source]);
            }

        } else {

            // The property of the linked item is not defined
            if (linked) {
                linked.unbind('change', triggerChange);
            }

            linked = new specs.Item();

        }

        if (active && linked) {

            linked.bind('change', function (instanceId) {

                if (!instanceId) {
                    console.warn('Instance id not received from item', linked);
                    return;
                }

                // Avoid cyclical events
                if (instanceId === proxy.instanceId) {
                    console.log('Cyclical event canceled', instanceId, proxy);
                    return;
                }

                triggerChange(instanceId);

            });

        }
        if (!active && linked) {
            linked.unbind('change', triggerChange);
        }

        items.set(property, linked);

    }

    // Check that all items are updated
    function updatePropertiesItems() {
        maps.forEach(function (specs, property) {
            updatePropertyItem(property, specs);
        });
    }

    this.update = function () {

        if (!initialised || !active) {
            return;
        }

        updatePropertiesItems();

    };

    this.define = function (specs, fields) {

        if (initialised) {
            console.error('Map already defined', this, proxy, item);
            throw new Error('Map already defined');
        }

        initialised = true;

        for (let property in specs) {
            if (!specs.hasOwnProperty(property)) continue;
            register(property, specs[property], fields);
        }

    };

    /**
     * Return the property specification
     *
     * @param property
     * @returns {any}
     */
    this.get = function (property) {
        return maps.get(property);
    };

    this.has = function (property) {
        return maps.has(property);
    };

}
