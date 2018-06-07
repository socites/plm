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
            if (item.id == id) {
                return key;
            }

        }

        return;

    }

    this.update = function (id, params) {

        let position = getPosition(id);
        if (!position) {
            return;
        }

        let item = data[position];
        data[position] = Object.assign(item, params);

        return data[position];

    };

    this.insert = function (data) {

        if (!entry.id) {
            entry.id = data.length + 1;
        }

        data.push(entry);

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
