function Collection(collection, attributes) {
    "use strict";

    attributes = (typeof attributes === 'object') ? attributes : {};

    let limit = attributes.limit;
    limit = (Number.isInteger(limit) && limit > 0) ? limit : 30;
    attributes.limit = limit;

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

    // Expose bind and unbind for handling events
    new CollectionEvents(collection, base);

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
        return base.fetch(limit);
    };

    collection.load = base.load;
    collection.clean = base.clean;

    // Expose the entries of the collection
    Object.defineProperty(collection, 'entries', {
        'get': function () {
            return base.entries;
        }
    });

}
