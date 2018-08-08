function CollectionProxy(collection, specs) {
    'use strict';

    specs = (specs) ? specs : {};
    let attributes = specs.attributes;
    let session = specs.session;
    let batch = specs.batch;

    attributes = (typeof attributes === 'object') ? attributes : {};
    Object.defineProperty(this, 'atributes', {'get': () => attributes});

    let limit = attributes.limit;
    limit = (Number.isInteger(limit) && limit > 0) ? limit : 30;

    // The limit property is not part of the attributes of the collection.
    delete attributes.limit;

    attributes = new CollectionAttributes(attributes);
    Object.defineProperty(this, 'attributes', {'get': () => attributes});
    Object.defineProperty(collection, 'attributes', {
        'get': () => (attributes) ? attributes.values : undefined
    });

    // Get collection base from the factory
    let registry = module.registries.collections.get(collection.constructor);
    if (!registry) {
        let message = 'Collection is not registered.';
        console.error(message, collection);
        throw new Error(message);
    }

    let base = registry.factory.get(attributes);

    let batcher;
    if (batch) {
        let factory = module.collectionsBatcherFactory;
        batcher = factory.get(registry, attributes, batch);
    }

    // Expose bind and unbind for handling events
    new CollectionEvents(collection, base);

    if (session && !registry.auth) {
        console.warn('Authentication is not supported in this collection. ' +
            'Session is going to be discarded.', collection);
        session = undefined;
    }

    Object.defineProperty(this, 'session', {'get': () => session});

    Object.defineProperty(collection, 'loaded', {'get': () => base.loaded});
    Object.defineProperty(collection, 'fetching', {'get': () => base.fetching});
    Object.defineProperty(collection, 'fetched', {'get': () => base.fetched});
    Object.defineProperty(collection, 'next', {'get': () => base.next});
    Object.defineProperty(collection, 'more', {'get': () => base.more});

    let ERRORS = module.COLLECTION_ERRORS;
    Object.defineProperty(collection, 'ERRORS', {'get': () => ERRORS});
    Object.defineProperty(collection, 'error', {'get': () => base.error});

    // Expose counter
    Object.defineProperty(collection, 'counter', {'get': () => base.counter});

    // Expose methods
    collection.fetch = function () {
        if (!attributes.ready) {
            throw new Error('Collection cannot be fetched as there are items in the attributes that are not persisted');
        }
        return base.fetch(limit, session, false, batcher);
    };

    collection.load = function (params) {
        if (!attributes.ready) {
            throw new Error('Collection cannot be loaded as there are items in the attributes that are not persisted');
        }
        return base.load(params, limit, session, batcher);
    };

    // Expose the items of the collection
    Object.defineProperty(collection, 'items', {'get': () => base.items});

    let getters = new CollectionGetters(base);
    Object.defineProperty(collection, 'getters', {'get': () => getters.values});

}
