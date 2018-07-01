module.exports = require('async')(function* (resolve, reject, params) {
    "use strict";

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let records = [...data.values];
        records.sort((a, b) => a.time_updated > b.time_updated);

        resolve({'records': records});

    }, 1000);

});
