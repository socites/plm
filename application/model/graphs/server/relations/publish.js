module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let data;
    data = require('./data.js');

    function publish() {

        try {

            if (params.id) {
                return data.update(params.id, params);
            }
            else {
                return data.insert(params);
            }

        }
        catch (exc) {
            reject(exc);
        }

    }

    setTimeout(function () {
        resolve(publish());
    }, 1000);

});
