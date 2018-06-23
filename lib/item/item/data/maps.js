function ItemMaps(proxy, item, data) {

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

    // The properties maps registered in the item
    let maps = new Map();
    Object.defineProperty(this, 'keys', {
        'get': function () {
            return maps.keys();
        }
    });

    // The items instances
    let items = new Map();

    function register(specs) {

        if (typeof specs !== 'object') {
            throw new Error('Invalid parameters');
        }

        let property = specs.property;
        let source = specs.source;
        let Item = specs.Item;
        let readOnly = (typeof specs.readOnly !== 'boolean') ? false : specs.readOnly;

        if (typeof property !== 'string' || typeof source !== 'string') {
            throw new Error('Invalid parameters');
        }

        maps.set(property, specs);

        function getProperty() {

            // If the property is an Item.
            if (Item) {
                updatePropertyItem(specs);
                return items.get(property);
            }

            return data[source];

        }

        function setProperty(value) {

            if (readOnly) {
                throw new Error('Property is read only');
            }

            data[source] = (typeof value === 'object') ? value.id : value;

        }

        Object.defineProperty(proxy, property, {'get': getProperty, 'set': setProperty});
        Object.defineProperty(item, property, {'get': getProperty, 'set': setProperty});

    }

    this.define = function (specs) {
        specs.map(property => this.register(property));
    };

    function updatePropertyItem(specs) {

        if (!specs.Item) {
            return;
        }

        let property = specs.property;
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
            linked.bind('change', triggerChange);
        }
        if (!active && linked) {
            linked.unbind('change', triggerChange);
        }

        items.set(property, linked);

    }

    // Check that all items are updated
    function updatePropertiesItems() {
        maps.forEach(specs => updatePropertyItem(specs));
    }

    this.update = function () {

        if (!active) {
            return;
        }

        updatePropertiesItems();

    };

}
