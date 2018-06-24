/**
 * TODO: select, update, insert
 * TODO: filter by entity_id, container_id
 */
module.exports = new (function () {

    let tu = 1;
    setInterval(function () {
        tu += 1000;
    }, 1000);

    let data = [
        {
            'id': '1',
            'time_updated': tu,
            'entity': '23.53',
            'container_id': 'user',
            'description': 'Mi primer post'
        },
        {
            'id': '2',
            'time_updated': tu,
            'entity': '22.52',
            'container_id': '1',
            'description': 'Comentario del primer post'
        },
        {
            'id': '3',
            'time_updated': tu,
            'entity': '23.53',
            'container_id': 'user',
            'description': 'Mi segundo post'
        },
        {
            'id': '4',
            'time_updated': tu,
            'entity': '22.52',
            'container_id': '3',
            'description': 'Comentario del segundo post'
        }
    ];

    function getIndex(id) {

        for (let key in data) {

            let item = data[key];
            if (item.id === id) {
                return key;
            }

        }

    }

    this.update = function (id, params) {

        let index = getIndex(id);
        if (!index) {
            return;
        }

        let item = Object.assign(data[index], {
            'time_updated': tu,
            'name': params.name
        });
        data[index] = item;

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

    function filterByIds(ids) {

        let output = [];
        for (let id of ids) {

            let index = getIndex(id);
            if (index) {
                output.push(data[index]);
            }
        }

        return output;

    }

    function filterByContainers(params) {

        let output = {};

        for (let id of params.container) {

            let records = [];
            output[id] = {'records': records};

            for (let graph of data) {

                if (graph.container_id !== id) continue;
                if (params.entity && params.entity !== graph.entity_id) continue;
                records.push({id: graph.id, 'time_updated': graph.time_updated});

            }

            if (!records.length) delete output[id];

        }

        return output;

    }

    this.select = function (params) {

        if (params.ids instanceof Array) {
            return filterByIds(params.ids);
        }
        if (params.container instanceof Array) {
            return filterByContainers(params);
        }

        let output = [];
        for (let record of data) {

            if (params.container && params.container !== record.container_id) continue;
            if (params.entity && params.entity !== record.entity_id) continue;

            output.push(record);

        }

        return output;

    };


});
