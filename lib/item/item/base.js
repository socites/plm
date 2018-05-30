function ItemBase(id, registry) {
    "use strict";

    let events = new Events({'bind': this});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
        }
    });

    Object.defineProperty(this, 'id', {
        'get': function () {
            return id;
        }
    });

    let ERRORS = Object.freeze({
        'NONE': 0,
        'INVALID_RESPONSE': 1
    });
    Object.defineProperty(this, 'ERRORS', {
        'get': function () {
            return ERRORS;
        }
    });

    let error;
    Object.defineProperty(this, 'error', {
        'get': function () {
            return error;
        },
        'set': function (value) {
            error = value;
        }
    });

    let data = new ItemData(this);

    // expose base.updated.time (the timeUpdated) & base.updated.value (boolean if item is updated)
    this.updated = new ItemUpdater(this, registry);

    new ItemFetchData(this, data, registry);
    new ItemFetchTU(this, data, registry);
    new ItemLoad(this);

}
