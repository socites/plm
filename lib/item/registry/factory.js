/**
 * The factory of items of an specific entity (by example: students)
 * @param registry
 * @param events
 * @constructor
 */
function ItemsFactory(registry, events) {
    "use strict";

    let internalId = 0;

    // The items instances
    let items = new Map();
    Object.defineProperty(this, 'items', {
        'get': function () {
            return items;
        }
    });

    let recent = new Map();

    function create() {

        let item = new ItemBase(undefined, ++internalId, registry);

        function onPublished() {

            if (!item.id) {
                console.log('Item with its id was expected after being published:', item);
                throw new Error('Item with its id was expected after being published');
            }
            unbind();

            items.set(item.id, item);
            recent.delete(item.internalId);

        }

        function unbind() {
            item.unbind('published', onPublished);
        }

        item.bind('published', onPublished);
        item.bind('destroyed', unbind);

        recent.set(item.internalId, item);

        events.trigger('created', item.internalId);

        return item;

    }

    this.get = function (id) {

        if (!id) {
            return create();
        }

        if (id.substr(0, 9) === 'internal.') {
            return recent.get(id);
        }

        if (items.has(id)) {
            return items.get(id);
        }

        let item = new ItemBase(id, ++internalId, registry);
        items.set(id, item);

        return item;

    };

}
