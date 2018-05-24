module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let timeUpdated = Date.now();

    let response = [
        {'a1': timeUpdated - 1000},
        {'a2': timeUpdated - 10000},
        {'a3': timeUpdated - 100000}
    ];

    resolve(response);

});
