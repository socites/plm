function CollectionBase(attributes, instanceId, registry) {
    'use strict';

    Object.defineProperty(this, 'attributes', {'get': () => attributes});

    instanceId = `instance.collection.${instanceId}`;
    Object.defineProperty(this, 'instanceId', {'get': () => instanceId});

    let events = new Events({'bind': this});
    Object.defineProperty(this, 'events', {'get': () => events});

    let ERRORS = module.COLLECTION_ERRORS;
    Object.defineProperty(this, 'ERRORS', {'get': () => ERRORS});

    let error;
    Object.defineProperty(this, 'error', {
        'get': () => error,
        'set': (value) => error = value
    });

    let items = new CollectionItems(this, registry);
    new CollectionFetch(this, items, registry);
    new CollectionLoad(this);

    let counter = new CollectionCounter(this, registry);
    Object.defineProperty(this, 'counter', {'get': () => counter});

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
