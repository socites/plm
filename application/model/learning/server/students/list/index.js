module.exports = require('async')(function* (resolve, reject, params) {
    "use strict";

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let records = [...data.values];

        console.log("Sorted Records", records);

        records.sort((a, b) => a.time_updated > b.time_updated);

        console.log("Records", records);
        console.log("Params", params);

        resolve({'records': records});

    }, 1000);

});
