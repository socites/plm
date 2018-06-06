module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    setTimeout(function () {
        resolve(db.publish(params));
    }, 1000);

});
