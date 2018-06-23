module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let db = require('./db.js');

    function list() {

        let data = db.select(params);
        data.sort(function (a, b) {
            return (a.id > b.id) ? -1 : 1;
        });

        return {'records': data, 'next': ''};

    }

    setTimeout(function () {
        resolve(list());
    }, 1000);

});
