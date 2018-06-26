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

    let ERRORS = module.COLLECTION_ERRORS;
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
    new CollectionFetch(this, items, registry);
    new CollectionLoad(this);

    let counter = new CollectionCounter(this, registry);
    Object.defineProperty(this, 'counter', {
        'get': function () {
            return counter;
        }
    });

    this.cache = new CollectionCache(this, registry, items);

    registry.items.bind('created', function (instanceId) {

        let item = new registry.Item(instanceId);

        if (registry.unshift(item)) {
            items.recent.unshift(item);
        }

    });

    this.toJSON = function () {
        return (this.fetched) ? this.items.toJSON() : undefined;
    };

}
