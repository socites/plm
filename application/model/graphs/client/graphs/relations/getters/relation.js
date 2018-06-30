function GraphRelationGetters(relation, direction) {

    let getters = {};
    Object.defineProperty(this, 'value', {
        'get': function () {
            return getters;
        }
    });

    Object.defineProperty(getters, 'relation', {
        'get': function () {
            return {
                'id': relation.id,
                'direction': direction
            };
        }
    });

    function expose(property) {

        Object.defineProperty(getters, property, {
            'get': function () {
                return relation[property];
            }
        });

    }

    expose('instanceId');
    expose('initialised');
    expose('fetching');
    expose('fetched');
    expose('loaded');

    let graph = relation[direction];

    // Expose properties of the relation
    for (let property of relation.properties) {

        // Exclude to expose from and to properties
        if (['from', 'to'].indexOf(property) !== -1) continue;

        Object.defineProperty(getters, property, {
            'get': function () {
                return relation.getters[property];
            }
        });

    }

    // Expose properties of the related graph
    for (let property of graph.properties) {

        Object.defineProperty(getters, property, {
            'get': function () {
                return graph.getters[property];
            }
        });

    }

}
