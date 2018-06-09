/**
 * TODO: select, update, insert
 * TODO: filter by entity_id, container_id
 */
module.exports = new (function () {

    let data = [
        {
            'id': '1',
            'comment': 'Something to say',
            'post_id': 100,
            'entity_id': 7,
            'container_id': 2
        },
        {
            'id': '1',
            'comment': 'Something to say',
            'post_id': 200,
            'entity_id': 7,
            'container_id': 2
        },
        {
            'id': '1',
            'comment': 'Something to say',
            'post_id': 100,
            'entity_id': 7,
            'container_id': 1
        },
        {
            'id': '1',
            'comment': 'Something to say',
            'post_id': 200,
            'entity_id': 7,
            'container_id': 1
        }

    ];


    let tu = 10;
    setInterval(function () {
        let item = data[getPosition('1')];
        item.time_updated++;
        item.name = `Henry ${item.time_updated}`;
    }, 10000);

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

    this.select = function (ids) {

        if (!ids) {
            return data;
        }

        if (ids instanceof Array) {
            return filter(ids);
        }

    };


});
