module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    let specs = {'limit': 2, 'next': 3};

    if (params.limit) {
        specs.limit = params.limit;
    }

    if (params.next) {
        specs.next = params.next;
    }

    setTimeout(function () {
        resolve(db.list(specs));
    }, 1000);

});
