module.exports = require('async')(function* (resolve, reject, params) {
    "use strict";

    if (!params.from && !params.to) {
        throw new Error('Invalid parameters');
    }

    let data;
    data = require('../data.js');
    let items = [...data.values];

    setTimeout(function () {

        let output = {};

        let key = (params.from) ? 'from' : 'to';

        for (let id of params[key]) {

            output[id] = items.reduce(function (count, relation) {

                // Filter container
                if (relation[key] !== id) {
                    return count;
                }

                return (count + 1);

            }, 0);

        }

        resolve(output);

    }, 1000);

});
