module.exports = new function () {

    let items = new Map();

    items.set('1', {
        'id': '1',
        'entity_relation': '1.1',
        'time_updated': 1,
        'from_id': '1',
        'to_id': '2',
        'is': 'friend'
    });

    items.set('2', {
        'id': '2',
        'entity_relation': '1.1',
        'time_updated': 1,
        'from_id': '1',
        'to_id': '3',
        'is': 'contact'
    });

    let tu = 10;
    setInterval(function () {
        tu++;
    }, 1000);

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

    /**
     * Checks if relation from and to exists
     *
     * @param from {string} Graph id, the 'from' of the relation
     * @param to {string} Graph id, the 'to' of the relation
     */
    function find(from, to) {

        let relations = [...items.values()];
        return relations.find(item => item.from_id === from && item.to_id === to);

    }

    this.insert = function (fields) {

        if (typeof fields.from_id !== 'string' || typeof fields.to_id !== 'string') {
            throw new Error(`Invalid fields 'from' and/or 'to'`);
        }

        if (find(fields.from_id, fields.to_id)) {
            throw new Error('Relation already exists');
        }

        let id = (items.size + 1).toString();

        let item = {
            'id': id,
            'time_updated': tu,
            'is': fields.is
        };

        items.set(id, item);
        return item;

    };

    this.update = function (id, fields) {

        if (!items.has(id)) {
            throw new Error(`Relation "${id}" does not exist`);
        }

        let item = items.get(id);

        item = Object.assign(item, {
            'time_updated': tu,
            'is': fields.is
        });
        items.set(id, item);

        return item;

    };

    this.remove = function (id) {

        if (!items.has(id)) {
            throw new Error(`Relation "${id}" does not exist`);
        }

        items.delete(id);

    };

};
