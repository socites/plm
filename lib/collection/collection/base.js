function CollectionBase(attributes, registry) {
    "use strict";

    let events = new Events({'bind': this});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
        }
    });

    Object.defineProperty(this, 'attributes', {
        'get': function () {
            return attributes;
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

    let items = new CollectionItems(this, registry);
    let fetch = new CollectionFetch(this, items, registry);
    let load = new CollectionLoad(this);

    this.cache = new CollectionCache(this, registry, items);

    registry.items.bind('created', function (item) {
        console.log('item created', item);
    });

    this.toJSON = function () {
        return (this.fetched) ? this.items.toJSON() : undefined;
    };

}
