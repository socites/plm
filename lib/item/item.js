function ItemBase(item, id, timeUpdated) {
    "use strict";

    Object.defineProperty(item, 'id', {
        'get': function () {
            return id;
        }
    });
    Object.defineProperty(item, 'timeUpdated', {
        'get': function () {
            return timeUpdated;
        }
    });

}
