module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    // let specs = {'limit': 2, 'next': 3};
    let specs = {};
    if (params.limit) {
        specs.limit = params.limit;
    }

    if (params.next) {
        specs.next = params.next;
    }

    if(params.entityId) {
        specs.entity_id = params.entityId;
    }

    if(params.containerId) {
        specs.container_id = params.containerId;
    }

    function list() {

        let data = db.select(specs);
        let total = (!!specs.limit && specs.limit < data.length) ? specs.limit : data.length;

        let output = {'records': [], 'next': ''};
        let next = (!!specs.next) ? specs.next : data.length;

        data.sort(function (a, b) {

            if (a.id > b.id) {
                return -1;
            }
            return 1;

        });

        for (let key in data) {

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

    }

    setTimeout(function () {
        resolve(list(specs));
    }, 1000);

});