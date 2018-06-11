function CollectionItems(base, registry) {
    "use strict";

    let ids = new Set(); // The ids in the order as they where received from the server.
    Object.defineProperty(this, 'data', {
        'get': function () {
            return [...ids.values()];
        }
    });

    let recent = new RecentlyCreatedItems(this, base);
    Object.defineProperty(this, 'recent', {
        'get': function () {
            return recent;
        }
    });

    let items = new Map(); // The items instances.
    Object.defineProperty(base, 'items', {
        'get': function () {

            let output = [];
            recent.items.map(item => output.push(item));
            ids.forEach(id => output.push(items.get(id)));

            return output;

        }
    });

    function triggerChange() {
        base.events.trigger('change');
    }

    function clean() {

        items.forEach(function (item) {
            item.unbind('change', triggerChange);
        });

        ids = new Set();
        items = new Map();

    }

    // The push method was designed to pass the data received from the server.
    this.push = function (values) {

        for (let entry of values) {

            if (!entry) {
                console.warn('There are undefined items in the collection:', values);
                continue;
            }

            if (typeof entry !== 'object') {
                entry = {'id': entry};
            }

            let id = entry.id;
            if (!id) {
                console.warn('Item id is not defined:', entry, '\nCheck records:', values);
                continue;
            }

            if (ids.has(id)) {
                console.warn('Item id is already in the collection', id);
                continue;
            }

            // Add the id to the set to assure order of items
            ids.add(id);

            let item = new registry.Item(id);
            if (entry.timeUpdated) {
                item.updated.time = entry.time_updated;
            }
            items.set(id, item);

            item.bind('change', triggerChange);

        }

        base.cache.save();

    };

    this.unshift = function (item) {

        if (!item.id) {
            let message = 'Item id not set';
            console.error(message, item);
            throw new Error(message);
        }

        // Unshift to the ids set.
        ids = [...ids];
        ids.unshift(item.id);
        ids = new Set(ids);

        // Add to the items map
        items.set(item.id, item);

        base.cache.save();

    };

    this.set = function (values) {
        clean();
        this.push(values);
    };

    this.toJSON = function () {
        return data;
    };

}