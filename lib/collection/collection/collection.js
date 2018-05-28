function Collection(collection, attributes) {

    let events = new Events({'bind': collection});

    // Get collection base from the factory
    let registries = module.registries;
    let registry = registries.get(collection.constructor);
    let base = registry.factory.get(collection.constructor, attributes);

    // Expose fetch method
    collection.fetch = base.fetch;

}
