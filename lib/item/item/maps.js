function ItemMaps(item, base) {

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

    // The items instances
    let items = new Map();

    this.register = function (specs) {

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

        Object.defineProperty(item, property, {
            'get': function () {

                // If the property is an Item.
                if (Item) {
                    updateProperty(property);
                    return items.get(property);
                }

                return item[source];

            }
        });

        if (!readOnly) {
            Object.defineProperty(item, property, {
                'set': function (value) {
                    item[source] = value;
                }
            });
        }

    };

    function updateProperty(specs) {

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
        if (item[source]) {

            if (!linked) {
                linked = new Item(item[source]);
                linked.bind('change', triggerChange);
            }
            else if (linked.id !== item[source]) {
                linked.unbind('change', triggerChange);
                linked = new Item(item[source]);
                linked.bind('change', triggerChange);
            }

        } else {

            // The property of the linked item is not defined
            if (linked) {
                linked.unbind('change', triggerChange);
                linked = undefined;
            }

        }

        items.set(property, linked);

    }

    // Check that all items are updated
    function update() {
        maps.forEach(specs => updateProperty(specs));
    }

    this.update = function () {

        if (!active) {
            return;
        }
        update();

    };

}
