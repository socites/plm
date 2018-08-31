module.exports = require('async')(function* (resolve, reject, params) {

    if (!params.from && !params.to) {
        throw new Error('Invalid parameters');
    }

    let data;
    data = require('../data.js');
    let items = [...data.values];

    setTimeout(function () {

        let output = {};

        let key = (params.from) ? 'from' : 'to';
        let field = (params.from) ? 'from_id' : 'to_id';

        for (let id of params[key]) {

            output[id] = items.reduce(function (count, relation) {
                return (relation[field] !== id) ? count : count + 1;
            }, 0);

        }

        resolve(output);

    }, 1000);

});
