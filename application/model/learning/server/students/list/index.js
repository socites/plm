module.exports = require('async')(function* (resolve, reject, params) {
    "use strict";

    function limitRecords(records) {
        let limit = params.limit;
        let limitedRecords = records.splice(limit);

        let next = limitedRecords.shift();

        return (!!next) ? next.id : false;
    }

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let records = [...data.values];

        records.sort((a, b) => (b.id - a.id));

        let next = limitRecords(records);

        console.log(next);

        resolve({'records': records});

    }, 1000);

});
