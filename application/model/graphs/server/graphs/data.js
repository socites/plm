module.exports = new (function () {

    let items = new Map();

    items.set('1', {
        'id': '1',
        'entity': '2.2',
        'time_updated': 1,
        'name': 'Julio',
        'last_name': 'Rodriguez'
    });

    items.set('2', {
        'id': '2',
        'entity': '2.2',
        'time_updated': 1,
        'name': 'Felix',
        'last_name': 'Lovato'
    });

    items.set('3', {
        'id': '3',
        'entity': '2.2',
        'time_updated': 1,
        'name': 'Andrés',
        'last_name': 'Calamaro'
    });

    items.set('4', {
        'id': '4',
        'entity': '2.2',
        'time_updated': 1,
        'name': 'Charly',
        'last_name': 'García'
    });

    items.set('5', {
        'id': '5',
        'entity': '3.3',
        'time_updated': 1,
        'owner_id': '1',
        'container_id': '1',
        'description': 'Mi primer post'
    });

    items.set('6', {
        'id': '6',
        'entity': '3.3',
        'time_updated': 1,
        'owner_id': '1',
        'container_id': '1',
        'description': 'Mi segundo post'
    });

    items.set('7', {
        'id': '7',
        'entity': '4.4',
        'time_updated': 1,
        'owner_id': '2',
        'container_id': '5',
        'description': 'Comentario del primer post'
    });

    items.set('8', {
        'id': '8',
        'entity': '4.4',
        'time_updated': 1,
        'owner_id': '2',
        'container_id': '6',
        'description': 'Comentario del segundo post'
    });

    items.set('9', {
        'id': '9',
        'entity': '4.4',
        'owner_id': '3',
        'time_updated': 1,
        'container_id': '6',
        'description': 'Segundo comentario del segundo post'
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
