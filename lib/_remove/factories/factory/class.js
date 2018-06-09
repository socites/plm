/**
 * The factory of items of an specific entity (by example: students)
 * @param name
 * @constructor
 */
function EntityFactory(name) {
    "use strict";

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

    // The items instances
    let items = new Map();

    this.get = function (id) {

        if (items.has(id)) {
            return items.get(id);
        }

        let item = new ItemBase(id);
        items.set(id, item);

        return item;

    };

    this.create = function () {

        let item = new ItemBase();

        function onPublished() {

            if (!item.id) {
                console.log('Item with its id was expected after being published:', item);
                throw new Error('Item with its id was expected after being published');
            }
            unbind();

            items.set(item.id, item);

        }

        function unbind() {
            item.unbind('published', onPublished);
        }

        item.bind('published', onPublished);
        item.bind('destroyed', unbind);

    };

}
