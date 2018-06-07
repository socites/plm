module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    if (!(params.ids instanceof Array)) {
        throw new Error('Invalid parameter ids');
    }

    let db = require('./db.js');

    function data() {

        let output = {};
        if (!params.ids) {
            return;
        }

        for (let id of params.ids) {

            let item = db.item(id);
            if (!item) {
                continue;
            }

            output[id] = item;

        }

        return output;

    };

    setTimeout(function () {
        resolve(data());
    }, 2000);

});
