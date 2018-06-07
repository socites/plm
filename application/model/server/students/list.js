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

    function list() {

        let data = db.select();
        let total = (!!specs.limit && specs.limit < data.length) ? specs.limit : data.length;

        let output = {'records': [], 'next': ''};
        let next = (!!specs.next) ? specs.next : data.length;

        data.sort(function (a, b) {

            if (a.id > b.id) {
                return -1;
            }
            return 1;

        });

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
        console.log("in list", output);
        return output;

    }

    setTimeout(function () {
        resolve(list(specs));
    }, 1000);

});
