module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let data;
    data = require('./data.js');

    function publish() {

        if (params.accessToken !== '1234') {
            throw new Error('User is not allowed to process this action.');
        }

        if (params.id) {
            return data.update(params.id, params);
        }
        else {
            return data.insert(params);
        }

    }

    setTimeout(function () {
        resolve(publish());
    }, 1000);

});
