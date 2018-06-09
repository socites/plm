/**
 * The factory of items of an specific entity (by example: students)
 * @param registry
 * @param events
 * @constructor
 */
function ItemsFactory(registry, events) {
    "use strict";

    // The items instances
    let items = new Map();
    Object.defineProperty(this, 'items', {
        'get': function () {
            return items;
        }
    });

    function create() {

        let item = new ItemBase(undefined, registry);

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

        events.trigger('created', item);

        return item;

    }

    this.get = function (id) {

        if (!id) {
            return create();
        }

        if (items.has(id)) {
            return items.get(id);
        }

        let item = new ItemBase(id, registry);
        items.set(id, item);

        return item;

    };

}
