module.exports = (require('async'))(function* (resolve, reject, params) {

    let data;
    data = require('../data.js');

    function add() {

        let id = items.autoincrement;

        let item = {
            'id': id,
            'time_updated': data.tu,
            'from_id': params.from,
            'to_id': params.to
        };

        data.items[id] = item;

        return item;

    }

    function update() {

        let id = params.id;

        if (!data[id]) {
            throw new Error(`Relation "${id}" does not exist.`);
        }

        let item = Object.assign(data.items[id], {
            'time_updated': data.tu,
            'is': params.is
        });
        data[id] = item;

        return item;

    }

    setTimeout(function () {
        return (params.id) ? update() : add();
    }, 1000);

});
