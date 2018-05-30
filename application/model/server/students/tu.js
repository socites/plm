module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    if (!(params.ids instanceof Array)) {
        throw new Error('Invalid parameter ids');
    }

    let db = require('./db.js');

    setTimeout(function () {
        resolve(db.tu(params.ids));
    }, 1000);

});
