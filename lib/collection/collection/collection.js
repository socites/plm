function Collection(collection, attributes) {

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
    let registry = module.get(collection.constructor);
    let base = registry.factory.get(attributes.key);

    // Expose bind and unbind for handling events
    new CollectionEvents(collection, base);

    // Expose fetch and load methods
    collection.fetch = base.fetch;
    collection.load = base.load;

    // Expose the entries of the collection
    Object.defineProperty(collection, 'entries', {
        'get': function () {
            return base.entries;
        }
    });
}
