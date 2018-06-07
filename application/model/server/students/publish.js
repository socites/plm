module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    function publish() {

        if (params.id) {
            db.update(params.id, params);
        }
        else {
            db.insert(params);
        }

    }

    setTimeout(function () {
        resolve(publish(params));
    }, 1000);

});
