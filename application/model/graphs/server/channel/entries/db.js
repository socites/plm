/**
 * TODO: select, update, insert
 * TODO: filter by entity_id, container_id
 */
module.exports = new (function () {

    let data = [
        {
            'id': '1',
            'comment': 'Something to say',
            'graph_id': '1',
        },
        {
            'id': '2',
            'comment': 'Something to say',
            'graph_id': '2',
        },
        {
            'id': '3',
            'comment': 'Something to say',
            'graph_id': '3',
        },
        {
            'id': '4',
            'comment': 'Something to say',
            'graph_id': '4',
        }
    ];

    let tu = 10;
    setInterval(function () {
        let item = data[getPosition('1')];
        item.time_updated++;
        item.name = `Henry ${item.time_updated}`;
    }, 10000);

    function getPosition(value, field) {

        field = (field) ? field : 'id';

        for (let key in data) {

            let item = data[key];
            if (item[field] === value) {
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

    function filter(ids, specs) {

        let output = [];
        for (let id of ids) {

            let position = getPosition(id);
            if (position) {

                let entry = data[position];

                if (!!specs.container_id && specs.container_id != entry.container_id ||
                    !!specs.entity_id && specs.entity_id != entry.entity_id) {
                    return;
                }

                output.push(data[position]);

            }

        }

        return output;

    }

    this.select = function (specs) {

        let ids = specs.ids;
        let output = [];

        if (ids instanceof Array) {
            output = filter(ids, specs);
        }
        else if (!!specs.container_id || !!specs.entity_id) {

            let output = [];
            for (let item of data) {

                if ((!!specs.container_id && specs.container_id != item.container_id) ||
                    !!specs.entity_id && specs.entity_id != item.entity_id) {
                    continue;
                }

                output.push(item);

            }

        } else {
            output = data;
        }

        return output;

    };

});
