module.exports = require('async')(function* (resolve, reject, params) {

    let data;
    data = require('../data.js');
    let items = [...data.values];

    setTimeout(function () {

        let output = {};

        for (let id of params.container) {

            output[id] = items.reduce(function (count, graph) {

                // Filter container
                if (graph.container_id !== id) {
                    return count;
                }

                // Filter entity
                let entity = graph.entity.split('.');
                if (params.entity && params.entity !== entity[0]) {
                    return count;
                }

                return (count + 1);

            }, 0);

        }

        resolve(output);

    }, 1000);

});
