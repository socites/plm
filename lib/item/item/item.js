function Item(item, id) {

    Object.defineProperty(item, 'id', {
        'get': function () {
            return id;
        }
    });

    // Get collection base from the factory
    let registry = module.registries.items.get(item.constructor);
    let base = registry.factory.get(id);

    // Expose bind and unbind for handling events
    new ItemEvents(item, base);

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

    // Expose fetch and load methods
    item.fetch = base.fetch;
    item.load = base.load;

}
