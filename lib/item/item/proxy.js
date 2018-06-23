function ItemProxy(item, id, session) {
    "use strict";

    // Get collection base from the factory
    let registry = module.registries.items.get(item.constructor);
    if (!registry) {
        let message = 'Item is not registered';
        console.error(message, item);
        throw new Error(message);
    }
    let base = registry.factory.get(id);

    if (session && !registry.auth) {
        console.warn('Authentication is not supported in this item. ' +
            'Session is going to be discarded.', item);
        session = undefined;
    }

    Object.defineProperty(this, 'session', {
        'get': function () {
            return session;
        }
    });

    Object.defineProperty(item, 'id', {
        'get': function () {
            return base.id;
        }
    });
    Object.defineProperty(item, 'internalId', {
        'get': function () {
            return base.internalId;
        }
    });

    Object.defineProperty(this, 'data', {
        'get': function () {
            return base.data;
        }
    });

    let maps = new ItemMaps(this, item, base.data);
    Object.defineProperty(this, 'maps', {
        'get': function () {
            return maps;
        }
    });

    // Expose bind and unbind for handling events
    let events = new ItemEvents(item, this, base, maps);

    maps.triggerChange = events.bindings.change.trigger;

    Object.defineProperty(item, 'loaded', {
        'get': function () {
            return base.loaded;
        }
    });
    Object.defineProperty(item, 'updating', {
        'get': function () {
            return base.updating;
        }
    });
    Object.defineProperty(item, 'fetching', {
        'get': function () {
            return base.fetching;
        }
    });
    Object.defineProperty(item, 'fetched', {
        'get': function () {
            return base.fetched;
        }
    });
    Object.defineProperty(item, 'publishing', {
        'get': function () {
            return base.publishing;
        }
    });
    Object.defineProperty(item, 'published', {
        'get': function () {
            return base.published;
        }
    });


    Object.defineProperty(item, 'ERRORS', {
        'get': function () {
            return base.ERRORS;
        }
    });
    Object.defineProperty(item, 'error', {
        'get': function () {
            return base.error;
        }
    });

    Object.defineProperty(this, 'unpublished', {
        'get': function () {
            return base.unpublished;
        }
    });

    Object.defineProperty(this, 'isUnpublished', {
        'get': function () {
            return base.isUnpublished;
        }
    });

    // Expose updated object
    item.updated = base.updated;

    item.toJSON = base.toJSON;

    let getters = new ItemGetters(base);
    Object.defineProperty(item, 'getters', {
        'get': function () {
            return getters.values;
        }
    });

    // Expose fetch and load methods
    item.fetch = function () {
        return base.fetch(session);
    };
    item.update = function () {
        return base.update(session);
    };

    // item.load can be overwritten
    function load(params) {
        return base.load(params, session);
    }

    item.load = load;
    this.load = load;

    // Expose the publish method
    item.publish = function (params) {
        return base.publish(params, session);
    };

}
