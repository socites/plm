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

        if (collectionsBatchers.has(attributes.key)) {
            attributesBatchers = collectionsBatchers.get(attributes.key);
        } else {
            attributesBatchers = new Map();
            collectionsBatchers.set(attributes.key, attributesBatchers);
        }

        if (attributesBatchers.has(key)) {
            return attributesBatchers.get(key);
        } else {
            let batcher = new CollectionsBatcher(registry, attributes.values, key);
            attributesBatchers.set(key, batcher);
            return batcher;
        }

    };

}
