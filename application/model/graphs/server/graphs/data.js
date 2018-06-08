module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    if (!(params.ids instanceof Array)) {
        throw new Error('Invalid parameter ids');
    }

    let db = require('./db.js');

    function data() {

        if (!params.ids) {
            return;
        }

        let data = db.select(params.ids);

        let output = {};
        for (let item of data) {
            output[item.id] = item;
        }

        return output;

    }

    setTimeout(function () {
        resolve(data());
    }, 2000);

});
