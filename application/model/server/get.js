module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    resolve(yield function* (resolve, reject, params) {

        var response = [
            {'1': '000000'},
            {'2': '000000'},
            {'3': '000000'}
        ];

        resolve(response);
    });

});
