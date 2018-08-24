module.exports = new (function () {

    let items = new Map();

    items.set('1', {'id': '1', 'time_updated': 10, 'name': 'Henry'});
    items.set('2', {'id': '2', 'time_updated': 20, 'name': 'Julio'});
    items.set('3', {'id': '3', 'time_updated': 30, 'name': 'Juan'});
    items.set('4', {'id': '4', 'time_updated': 40, 'name': 'Felix'});
    items.set('5', {'id': '5', 'time_updated': 10, 'name': 'Henry'});
    items.set('6', {'id': '6', 'time_updated': 20, 'name': 'Julio'});
    items.set('7', {'id': '7', 'time_updated': 30, 'name': 'Juan'});
    items.set('8', {'id': '8', 'time_updated': 40, 'name': 'Felix'});
    items.set('9', {'id': '9', 'time_updated': 10, 'name': 'Henry'});
    items.set('10', {'id': '10', 'time_updated': 20, 'name': 'Julio'});
    items.set('11', {'id': '11', 'time_updated': 30, 'name': 'Juan'});
    items.set('12', {'id': '12', 'time_updated': 40, 'name': 'Felix'});
    items.set('13', {'id': '13', 'time_updated': 10, 'name': 'Henry'});
    items.set('14', {'id': '14', 'time_updated': 20, 'name': 'Julio'});
    items.set('15', {'id': '15', 'time_updated': 30, 'name': 'Juan'});
    items.set('16', {'id': '16', 'time_updated': 40, 'name': 'Felix'});

    let tu = 10;
    setInterval(function () {

        let item = items.get('1');
        if (!item) return;

        item.time_updated++;
        item.name = `Henry ${item.time_updated}`;

    }, 10000);

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

        let id = (items.size + 1).toString();

        let item = {
            'id': id,
            'time_updated': tu,
            'name': fields.name
        };

        items.set(id, item);
        return item;

    };

    this.update = function (id, fields) {

        if (!items.has(id)) {
            throw new Error(`Student "${id}" does not exist`);
        }

        let item = items.get(id);

        item = Object.assign(item, {
            'time_updated': tu,
            'name': fields.name
        });
        items.set(id, item);

        return item;

    };

    this.remove = function (id) {

        if (!items.has(id)) {
            throw new Error(`Student "${id}" does not exist`);
        }

        items.delete(id);

    };

});
