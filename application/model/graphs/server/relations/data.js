module.exports = new function () {

    let items = new Map();

    items.set('1', {
        'id': '1',
        'entity_relation': '1',
        'time_updated': 1,
        'from': '1',
        'to': '2',
        'is': 'friend'
    });

    items.set('2', {
        'id': '2',
        'entity_relation': '1',
        'time_updated': 1,
        'from': '1',
        'to': '3',
        'is': 'contact'
    });

    Object.defineProperty(this, 'size', {
        'get': function () {
            return items.size;
        }
    });

    Object.defineProperty(this, 'values', {
        'get': function () {
            return items.values();
        }
    });

    this.get = function (id) {
        return items.get(id);
    };

    this.has = function (id) {
        return items.has(id);
    };

    this.insert = function (fields) {

    };

    this.update = function (id, fields) {

    };

};
