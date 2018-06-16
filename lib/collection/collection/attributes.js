/**
 * Make the attributes of the collections read only and generate
 * a key to be used by the factory.
 * The attributes of the collection defines the collection base instance.
 * Same attributes uses the same collection base instance.
 *
 * @param attributes
 * @constructor
 */
function CollectionAttributes(attributes) {
    "use strict";

    let map = new Map();
    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            return values;
        }
    });

    /**
     * Check if attributes that are items are already persisted.
     * If some item in the attributes is not persisted, then it is not possible
     * to fetch nor update the collection.
     */
    Object.defineProperty(this, 'ready', {
        'get': function () {

            let ready = true;
            map.forEach(function (attribute) {
                if (typeof attribute !== 'object') {
                    return;
                }
                ready = ready && !!attribute.id;
            });

            return ready;
        }
    });

    for (let key in attributes) {

        if (!attributes.hasOwnProperty(key)) continue;

        map.set(key, attributes[key]);

        Object.defineProperty(values, key, {
            'get': function () {
                return map.get(key);
            }
        });

    }

    // The key is the string generated from the list of the attributes,
    // by alphabetically sorting their keys, and including their corresponding values
    let key;
    Object.defineProperty(this, 'key', {
        'get': function () {
            return key;
        }
    });

    // Generate the key. The key is used to uniquely identify the collection base.
    key = '';
    [...map.keys()].sort().forEach(function (name) {

        let value = values[name];

        // If the value is an item, take its internalId, because the id may not be set
        // when the item is recently created.
        value = (typeof value === 'object') ? value.internalId : value;

        key += name + ':' + value;

    });

}
