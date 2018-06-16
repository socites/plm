function Collection(collection, attributes, session) {
    "use strict";

    attributes = (typeof attributes === 'object') ? attributes : {};

    let limit = attributes.limit;
    limit = (Number.isInteger(limit) && limit > 0) ? limit : 30;

    // The limit property is not part of the attributes of the collection.
    delete attributes.limit;

    attributes = new CollectionAttributes(attributes);

    // Get collection base from the factory
    let registry = module.registries.collections.get(collection.constructor);
    if (!registry) {
        let message = 'Collection is not registered.';
        console.error(message, collection);
        throw new Error(message);
    }

    let base = registry.factory.get(attributes);

    // Expose bind and unbind for handling events
    new CollectionEvents(collection, base);

    Object.defineProperty(this, 'attributes', {
        'get': function () {
            return attributes;
        }
    });
    Object.defineProperty(collection, 'attributes', {
        'get': function () {
            return (attributes) ? attributes.values : undefined;
        }
    });

    if (session && !registry.auth) {
        console.warn('Authentication is not supported in this collection. ' +
            'Session is going to be discarded.', collection);
        session = undefined;
    }

    Object.defineProperty(this, 'session', {
        'get': function () {
            return session;
        }
    });

    Object.defineProperty(collection, 'loaded', {
        'get': function () {
            return base.loaded;
        }
    });
    Object.defineProperty(collection, 'fetching', {
        'get': function () {
            return base.fetching;
        }
    });
    Object.defineProperty(collection, 'fetched', {
        'get': function () {
            return base.fetched;
        }
    });

    let ERRORS = module.COLLECTION_ERRORS;
    Object.defineProperty(collection, 'ERRORS', {
        'get': function () {
            return ERRORS;
        }
    });
    Object.defineProperty(collection, 'error', {
        'get': function () {
            return base.error;
        }
    });

    // Expose methods
    collection.fetch = function () {
        if (!attributes.ready) {
            throw new Error('Collection cannot be fetched as there are items in the attributes that are not persisted');
        }
        return base.fetch(limit, session);
    };

    collection.load = function (params) {
        if (!attributes.ready) {
            throw new Error('Collection cannot be loaded as there are items in the attributes that are not persisted');
        }
        return base.load(params, limit, session);
    };

    // Expose the items of the collection
    Object.defineProperty(collection, 'items', {
        'get': function () {
            return base.items;
        }
    });

}
