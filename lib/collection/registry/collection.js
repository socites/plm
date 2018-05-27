function CollectionRegistry(Collection, Item, specs) {

    let factory = new CollectionsFactory();
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
    Object.defineProperty(this, 'paths', {
        'get': function () {
            return specs.paths;
        }
    });

    // The batch for fetching items
    // Each entity has its own batch for fetching items
    let batcher = (specs.batcher) ? new Batcher(specs.batcher) : undefined;
    Object.defineProperty(this, 'batcher', {
        'get': function () {
            return batcher;
        }
    });

}
