function Collection(collection, attributes) {

    let events = new Events({'bind': collection});

    let registries = module.registries;
    let registry = registries.get(collection.constructor);
    let base = registry.factory.get(collection.constructor, attributes);

}
