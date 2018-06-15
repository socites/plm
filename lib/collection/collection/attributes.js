/**
 * Make the attributes of the collections read only and generate
 * a key to be used by the factory.
 * The attributes of the collection defines the collection base instance.
 * Same attributes uses the same collection base instance.
 *
 * @param attributes
 * @constructor
 */
function CollectionAttributes(collection, attributes) {
    "use strict";

    attributes = (typeof attributes === 'object') ? attributes : {};

    let limit = attributes.limit;
    limit = (Number.isInteger(limit) && limit > 0) ? limit : 30;

    // The limit property is not part of the attributes of the collection.
    delete attributes.limit;

    let map = new Map();
    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            return values;
        }
    });

    for (let key in attributes) {

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

    // Generate the key
    key = '';
    [...map.keys()].sort().forEach(function (name) {
        key += name + ':' + values[name];
    });

}
