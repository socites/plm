/**
 * TODO: select, update, insert
 */
module.exports = new (function () {

    let data = [
        {'id': '1', 'time_updated': 10, 'name': 'Henry'},
        {'id': '3', 'time_updated': 30, 'name': 'Juan'},
        {'id': '4', 'time_updated': 40, 'name': 'Felix'},
        {'id': '2', 'time_updated': 20, 'name': 'Julio'}
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
            'id': params.length + 1,
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
