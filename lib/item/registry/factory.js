/**
 * The factory of items of an specific entity (by example: students)
 * @param name
 * @constructor
 */
function ItemsFactory(registry) {
    "use strict";

    // The items instances
    let items = new Map();
    Object.defineProperty(this, 'items', {
        'get': function () {
            return items;
        }
    });

    this.get = function (id) {

        if (items.has(id)) {
            return items.get(id);
        }

        let item = new ItemBase(id, registry);
        items.set(id, item);

        return item;

    };

    this.create = function () {

        let item = new ItemBase(registry);

        function onAdded() {

            if (!item.id) {
                console.log('Item with its id was expected after being published:', item);
                throw new Error('Item with its id was expected after being published');
            }
            unbind();

            items.set(item.id, item);

        }

        function unbind() {
            item.unbind('published', onAdded);
        }

        item.bind('published', onAdded);
        item.bind('destroyed', unbind);

    };

}