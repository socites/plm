/**
 * The factory of collections of an specific class (by example: students)
 * @param name
 * @constructor
 */
function CollectionsClassFactory(name) {
    "use strict";

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

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
