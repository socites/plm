module.exports = new (function () {

    let items = new Map();

    items.set('1', {
        'id': '1',
        'time_updated': 20,
        'comment': 'Share of post "1"',
        'graph_id': '5'
    });

    items.set('2', {
        'id': '2',
        'time_updated': 20,
        'comment': 'Share of post "3"',
        'graph_id': '6'
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

});
