module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    if (!(params.ids instanceof Array)) {
        throw new Error('Invalid parameter ids');
    }

    let db = require('./db.js');

    function tu() {

        let output = {};

        for (let id of params.ids) {

            let item = db.item(id);
            if (!item) {
                continue;
            }
            output[id] = item.time_updated;

        }

        return output;

    }

    setTimeout(function () {
        resolve(tu());
    }, 1000);

});
