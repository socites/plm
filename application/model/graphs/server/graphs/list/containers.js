module.exports = require('async')(function* (resolve, reject, params) {

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let output = {};

        for (let id of params.container) {

            let graphs = [...data.values];

            graphs = graphs.filter(function (graph) {

                // Filter by container
                if (graph.container_id !== id) return false;

                // Filter by entity
                let entity = graph.entity.split('.');
                return !(params.entity && params.entity !== entity[0]);

            });

            graphs.sort((a, b) => a.time_updated - b.time_updated);

            graphs = graphs.map(graph => ({'id': graph.id, 'time_updated': graph.time_updated}));

            output[id] = {'records': graphs};

        }

        resolve(output);

    }, 1000);

});
