module.exports = require('async')(function* (resolve, reject, params) {

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let output = {};

        for (let id of params.container) {

            let graphs = [...data.values];

            graphs.filter(function (graph) {

                // Filter by container
                if (graph.container_id !== id) return;

                // Filter by entity
                let entity = graph.entity.split('.');
                if (params.entity && params.entity !== entity[0]) return;

                return true;
            });

            graphs = graphs.map(graph => ({'id': graph.id, 'time_updated': graph.time_updated}));

            output[id] = {'records': graphs};

        }

        resolve(output);

    }, 1000);

});
