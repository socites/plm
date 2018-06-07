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
        let item = getItem('1');
        item.time_updated++;
        item.name = `Henry ${item.time_updated}`;
    }, 10000);

    function getItem(id, pos) {

        let output;

        for (let key in data) {
            let item = data[key];
            if (item.id == id) {
                output = item;

                if (pos) {
                    return key;
                }
            }
        }

        return output;

    }

    function getPosition(id) {

        for (let key in data) {

            let item = data[key];
            if (item.id == id) {
                return key;
            }

        }

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

        for (let id in ids) {

        }

    }

    this.select = function (ids) {

        if (!ids) {
            return data;
        }

        if (ids instanceof Array) {
            return filter(ids);
        }

    };

    this.collection = function () {
        return data;
    };

    this.item = getItem;

    this.publish = function (specs) {

        let item = {};
        if (specs.id) {
            let position = getItem(specs.id, true);
            item = data[position];
        }
        else {
            item.id = data.length + 1;
        }

        item.name = specs.name;
        item.time_updated = Math.floor(Date.now() / 1000);

        if (!specs.id) {
            data.push(item);
        }

        console.log(data);
    };

});
