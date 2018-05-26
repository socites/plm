module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let data, response;
    data = require('./data.js');

    if (params.data === 'timeUpdated') {
        response = data.get(params.ids, {'data': 'time_updated'});
    }
    else {
        response = data.get(params.ids);
    }

    resolve(response);

});
