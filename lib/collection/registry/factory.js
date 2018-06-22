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

        if (collections.has(attributes.key.value)) {
            return collections.get(attributes.key.value);
        }

        let collection = new CollectionBase(attributes, registry);
        collections.set(attributes.key.value, collection);

        return collection;

    };

}
