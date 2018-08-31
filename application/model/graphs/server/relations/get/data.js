module.exports = require('async')(function* (resolve, reject, params) {

    if (!(params.ids instanceof Array)) {
        throw new Error('Invalid parameter ids');
    }

    setTimeout(function () {

        let items;
        items = require('../data.js');

        let output = {};
        params.ids.map(id => output[id] = items.get(id));

        resolve(output);

    }, 2000);

});
