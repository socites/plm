module.exports = require('async')(function* (resolve, reject, params) {
    "use strict";

    if (!params.from || !params.to) {
        throw new Error('Invalid parameters');
    }

    setTimeout(function () {

        let items;
        items = [...require('../data.js').values];

        resolve(items.find(item => item.from_id === params.from && item.to_id === params.to));

    }, 2000);

});
