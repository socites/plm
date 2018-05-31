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

    this.data = new ItemData(this);

    this.cache = new ItemCache(this, registry);

    // expose base.updated.time (the timeUpdated) & base.updated.value (boolean if item is updated)
    this.updated = new ItemUpdater(this, registry);

    new ItemFetch(this, registry);
    new ItemLoad(this);

    this.toJSON = function () {
        return (this.fetched) ? data.toJSON() : undefined;
    };

}
