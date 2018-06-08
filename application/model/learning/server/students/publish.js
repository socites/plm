module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    function publish() {

        if (params.id) {
            return db.update(params.id, params);
        }
        else {
            return db.insert(params);
        }

    }

    setTimeout(function () {
        resolve(publish(params));
    }, 1000);

});
