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


    function getItem(id) {

        let output;

        for (let key in data) {
            let item = data[key];
            if (item.id == id) {
                output = item;
            }
        }

        return output;

    }

    function order(a, b) {

        if (a.id > b.id) {
            return -1;
        }
        return 1;

    }

    this.list = function (specs) {

        let total = (!!specs.limit && specs.limit < data.length) ? specs.limit : data.length;
        let output = {'records': [], 'next': ''};
        let next = (!!specs.next) ? specs.next : 1;
        data.sort(order);

        for (var key in data) {

            let item = data[key];
            if (next < item.id) {
                continue;
            }

            if (!total) {
                output.next = item.id;
                continue;
            }
            --total;
            output.records.push({'id': item.id, 'time_updated': data.time_updated});


        }

        return output;

    };

    this.tu = function (ids) {

        let output = {};
        for (let id of ids) {

            let item = getItem(id);
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

            let item = getItem(id);
            if (!item) {
                continue;
            }

            output[id] = item;

        }

        return output;

    };

    this.save = function (specs) {

        let item;
        if (specs.id) {
            item = getItem(specs.id);

        }
        else {

        }
    };

});
