function CollectionRegistry(Collection, Item, specs) {

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
    Object.defineProperty(this, 'immutable', {
        'get': function () {
            return !!specs.immutable;
        }
    });
    Object.defineProperty(this, 'auth', {
        'get': function () {
            return !!specs.auth;
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
