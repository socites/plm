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

    this.cache = new ItemCache(this, registry);

    this.data = new ItemData(this);

    // expose base.updated.time (the timeUpdated) & base.updated.value (boolean if item is updated)
    this.updated = new ItemUpdater(this, registry);

    new ItemFetch(this, registry);
    new ItemLoad(this);
    new ItemPublish(this, registry);

    this.toJSON = function () {

        // this.data.toJSON returns an object with the values of the published values
        // If the item is not fetched, then the published values are not set
        if (!this.fetched) {
            return;
        }

        let json = this.data.toJSON();
        json.id = id;

        return json;

    };

}
