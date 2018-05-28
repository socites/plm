/**
 * The factory of collections of an specific class (by example: students)
 * @param name
 * @constructor
 */
function CollectionsFactory(registry) {
    "use strict";

    // The items instances
    let collections = new Map();

    this.get = function (attributes) {

        if (collections.has(attributes.key)) {
            return collections.get(attributes.key);
        }

        let collection = new CollectionBase(attributes.values, registry);
        collections.set(attributes.key, collection);

        return collection;

    };

}
