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
    'use strict';

    let map = new Map();
    Object.defineProperty(this, 'values', {
        'get': function () {
            let values = {};
            map.forEach(function (value, key) {
                values[key] = (typeof value === 'object') ? value.id : value;
            });
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
                if (typeof attribute !== 'object') return;
                ready = ready && !!attribute.id;
            });

            return ready;

        }
    });

    for (let key in attributes) {
        if (!attributes.hasOwnProperty(key)) continue;
        map.set(key, attributes[key]);
    }

    this.has = (name) => map.has(name);

    this.get = function (name) {
        let value = map.get(name);
        return (typeof value === 'object') ? value.id : value;
    };

    let key = new AttributesKey(map);
    Object.defineProperty(this, 'key', {'get': () => key});

}
