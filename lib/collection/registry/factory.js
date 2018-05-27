/**
 * The factory of collections of an specific class (by example: students)
 * @param name
 * @constructor
 */
function CollectionsFactory() {
    "use strict";

    // The items instances
    let collections = new Map();

    this.get = function (key) {

        if (collections.has(key)) {
            return collections.get(key);
        }

        let collection = new CollectionBase();
        collections.set(key, collection);

        return collection;

    };

}
