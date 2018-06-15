function Collection(collection, session) {
    "use strict";

    let base;

    // Expose bind and unbind for handling events
    let events = new CollectionEvents(collection);

    let attributes;
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

    let limit;

    // Get collection base from the factory
    let registry = module.registries.collections.get(collection.constructor);
    if (!registry) {
        let message = 'Collection is not registered';
        console.error(message, collection);
        throw new Error(message);
    }

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
            return (base) ? base.loaded : false;
        }
    });
    Object.defineProperty(collection, 'fetching', {
        'get': function () {
            return (base) ? base.fetching : false;
        }
    });
    Object.defineProperty(collection, 'fetched', {
        'get': function () {
            return (base) ? base.fetched : false;
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
            return (base) ? base.error : undefined;
        }
    });

    // Expose methods
    collection.fetch = function () {
        if (!base) {
            throw new Error('Collection not initialised');
        }
        return base.fetch(limit, session);
    };

    collection.load = function (params) {
        if (!base) {
            throw new Error('Collection not initialised');
        }
        return base.load(params, limit, session);
    };

    // Expose the items of the collection
    Object.defineProperty(collection, 'items', {
        'get': function () {
            return (base) ? base.items : [];
        }
    });

    this.initialise = function (attrs) {

        limit = attrs.limit;
        limit = (Number.isInteger(limit) && limit > 0) ? limit : 30;

        // The limit property is not part of the attributes of the collection.
        delete attrs.limit;

        attributes = new CollectionAttributes(collection, attrs);

        base = registry.factory.get(attributes);

        events.initialise(base);

    };

}
