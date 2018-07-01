module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let data;
    data = require('./data.js');

    if (!params.id) {
        throw new Error(`Invalid parameters`);
    }

    function remove() {

        if (params.accessToken !== '1234') {
            throw new Error('User is not allowed to process this action.');
        }
        if (params.id) {
            return data.remove(params.id, params);
        }

    }

    setTimeout(function () {
        resolve(remove(params));
    }, 1000);

});
