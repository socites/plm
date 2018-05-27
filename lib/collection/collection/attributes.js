/**
 * Make the attributes of the collections read only and generate
 * a key to be used by the factory
 * @param attributes
 * @constructor
 */
function CollectionAttributes(attributes) {

    if (!attributes) {
        return;
    }

    if (typeof attributes !== 'object') {
        throw new Error('Invalid attributes parameter');
    }

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
        key += name + ':' + values.get(name);
    });

}
