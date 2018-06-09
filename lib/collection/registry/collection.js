function CollectionRegistry(Collection, Item, specs) {
    "use strict";

    this.items = new ItemsManager(Collection, Item);

    let factory = new CollectionsFactory(this);
    Object.defineProperty(this, 'factory', {
        'get': function () {
            return factory;
        }
    });

    Object.defineProperty(this, 'Collection', {
        'get': function () {
            return Collection;
        }
    });
    Object.defineProperty(this, 'Item', {
        'get': function () {
            return Item;
        }
    });
    Object.defineProperty(this, 'module', {
        'get': function () {
            return specs.module;
        }
    });
    Object.defineProperty(this, 'actions', {
        'get': function () {
            return specs.actions;
        }
    });
    Object.defineProperty(this, 'auth', {
        'get': function () {
            return !!specs.auth;
        }
    });

    let cache = specs.cache;
    if (['string', 'object', 'undefined'].indexOf(typeof cache) === -1) {
        console.warn('Invalid collection cache registry', Collection, specs);
        cache = undefined;
    }
    cache = (typeof cache === 'string') ? cache = {'key': cache} : cache;
    if (cache && (typeof cache.key !== 'string' || !cache.key)) {
        console.warn('Invalid collection cache key', Collection, specs);
        cache = undefined;
    }

    Object.defineProperty(this, 'cache', {
        'get': function () {
            return cache;
        }
    });

    if (specs.auth) {
        new CollectionsAuthManager(factory);
    }

    // The batch for fetching items
    // Each entity has its own batch for fetching items
    let batcher = (specs.batcher) ? new Batcher(specs.batcher) : undefined;
    Object.defineProperty(this, 'batcher', {
        'get': function () {
            return batcher;
        }
    });

}
