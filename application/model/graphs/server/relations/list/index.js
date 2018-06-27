module.exports = require('async')(function* (resolve, reject, params) {

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let output = {};

        let key = (params.from) ? 'from' : 'to';

        for (let id of params[key]) {

            let relations = [...data.values];

            relations = relations.filter(relation => relation[key] === id);
            relations = relations.map(relation => ({'id': relation.id, 'time_updated': relation.time_updated}));

            output[id] = {'records': relations};

        }

        resolve(output);

    }, 1000);

});
