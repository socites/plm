function Collection(collection, attributes) {

    let events = new Events({'bind': collection});

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
    let registries = module.registries;
    let registry = registries.get(collection.constructor);
    let base = registry.factory.get(collection.constructor, attributes.key);

    // Expose fetch method
    collection.fetch = base.fetch;
    collection.load = base.load;

    Object.defineProperty(collection, 'entries', {
        'get': function () {
            return base.entries;
        }
    });
}
