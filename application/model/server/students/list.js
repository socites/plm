module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    setTimeout(function () {
        resolve({'records': db.list()});
    }, 1000);

});
