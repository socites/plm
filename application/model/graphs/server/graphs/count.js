module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    function list() {

        let data = db.select(params);
        return data;

    }

    setTimeout(function () {
        resolve(list());
    }, 1000);

});
