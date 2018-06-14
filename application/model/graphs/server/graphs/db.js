/**
 * TODO: select, update, insert
 * TODO: filter by entity_id, container_id
 */
module.exports = new (function () {

    let data = [
        {
            'id': '1',
            'time_updated': 10,
            'entity_id': '7',
            'container_id': 'user',
            'description': 'Mi primer post'
        },
        {
            'id': '2',
            'time_updated': 10,
            'entity_id': '22',
            'container_id': '1',
            'description': 'Comentario del primer post'
        },
        {
            'id': '3',
            'time_updated': 10,
            'entity_id': '7',
            'container_id': 'user',
            'description': 'Mi segundo post'
        },
        {
            'id': '4',
            'time_updated': 10,
            'entity_id': '22',
            'container_id': '1',
            'description': 'Comentario del segundo post'
        }
    ];

    function getPosition(id) {

        for (let key in data) {

            let item = data[key];
            if (item.id === id) {
                return key;
            }

        }

    }

    this.update = function (id, params) {

        let position = getPosition(id);
        if (!position) {
            return;
        }

        let item = Object.assign(data[position], {
            'time_updated': tu,
            'name': params.name
        });
        data[position] = item;

        return item;

    };

    this.insert = function (params) {

        let item = {
            'id': (data.length + 1).toString(),
            'time_updated': tu,
            'name': params.name
        };

        data.push(item);

        return item;

    };

    function filter(ids) {

        let output = [];
        for (let id of ids) {

            let position = getPosition(id);
            if (position) {
                output.push(data[position]);
            }
        }

        return output;

    }

    this.select = function (params) {

        if (!params.ids) {
            return data;
        }

        if (params.ids instanceof Array) {
            return filter(params.ids);
        }

    };


});
