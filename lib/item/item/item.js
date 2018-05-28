function Item(item, id) {

    // Get collection base from the factory
    let registry = module.registries.get(item.constructor);
    let base = registry.factory.get(id);

    // Expose bind and unbind for handling events
    new ItemEvents(item, base);

    // Expose fetch and load methods
    item.fetch = base.fetch;
    item.load = base.load;

}
