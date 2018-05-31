module.exports = new (function () {

    let data = new Map();
    data.set('1', {'id': '1', 'time_updated': 10, 'name': 'Henry'});
    data.set('2', {'id': '2', 'time_updated': 20, 'name': 'Julio'});
    data.set('3', {'id': '3', 'time_updated': 30, 'name': 'Juan'});
    data.set('4', {'id': '4', 'time_updated': 40, 'name': 'Felix'});

    let tu = 10;
    setInterval(function () {
        let item = data.get('1');
        item.time_updated++;
        item.name = `Henry ${item.time_updated}`;
    }, 10000);

    this.list = function () {

        let output = [];
        data.forEach(function (item, id) {
            output.push({'id': item.id, 'time_updated': data.time_updated});
        });

        return output;

    };

    this.tu = function (ids) {

        let output = {};
        for (let id of ids) {

            let item = data.get(id);
            if (!item) {
                continue;
            }

            output[id] = item.time_updated;

        }

        return output;

    };

    this.data = function (ids) {

        let output = {};
        for (let id of ids) {

            let item = data.get(id);
            if (!item) {
                continue;
            }

            output[id] = item;

        }

        return output;

    };

});