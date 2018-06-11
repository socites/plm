function Collection(collection, attributes, session) {
    "use strict";

    attributes = (typeof attributes === 'object') ? attributes : {};

    let limit = attributes.limit;
    limit = (Number.isInteger(limit) && limit > 0) ? limit : 30;

    // The limit property is not part of the attributes of the collection.
    delete attributes.limit;

    // The attributes of the collection defines the collection base instance
    // Same attributes uses the same collection base instance
    attributes = new CollectionAttributes(attributes);
    Object.defineProperty(this, 'attributes', {
        'get': function () {
            return attributes;
        }
    });
    Object.defineProperty(collection, 'attributes', {
        'get': function () {
            return attributes.values;
        }
    });

    // Get collection base from the factory
    let registry = module.registries.collections.get(collection.constructor);
    let base = registry.factory.get(attributes);

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

    // Expose bind and unbind for handling events
    new CollectionEvents(collection, base);

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

    Object.defineProperty(collection, 'ERRORS', {
        'get': function () {
            return base.ERRORS;
        }
    });
    Object.defineProperty(collection, 'error', {
        'get': function () {
            return base.error;
        }
    });

    // Expose methods
    collection.fetch = function () {
        return base.fetch(limit, session);
    };

    collection.load = function (params) {
        return base.load(params, limit, session);
    };

    // Expose the items of the collection
    Object.defineProperty(collection, 'items', {
        'get': function () {
            return base.items;
        }
    });

}
