function RegistryItem(Item, factory, specs) {

    Object.defineProperty(this, 'Item', {
        'get': function () {
            return Item;
        }
    });
    Object.defineProperty(this, 'factory', {
        'get': function () {
            return factory;
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
    let batcher = new Batcher(specs);
    Object.defineProperty(this, 'batcher', {
        'get': function () {
            return batcher;
        }
    });

}