function CollectionsBatcherFactory() {

    let batchers = new Map();

    this.get = function (registry, attributes, key) {

        let collectionsBatchers, attributesBatchers;

        if (batchers.has(registry.Collection)) {
            collectionsBatchers = batchers.get(registry.Collection);
        } else {
            collectionsBatchers = new Map();
            batchers.set(registry.Collection, collectionsBatchers);
        }

        let attributesExceptKey = attributes.key.except(key);

        if (collectionsBatchers.has(attributesExceptKey)) {
            attributesBatchers = collectionsBatchers.get(attributesExceptKey);
        } else {
            attributesBatchers = new Map();
            collectionsBatchers.set(attributesExceptKey, attributesBatchers);
        }

        if (attributesBatchers.has(key)) {
            return attributesBatchers.get(key);
        } else {
            let batcher = new CollectionsBatcher(registry, attributes, key);
            attributesBatchers.set(key, batcher);
            return batcher;
        }

    };

}

module.collectionsBatcherFactory = new CollectionsBatcherFactory();
