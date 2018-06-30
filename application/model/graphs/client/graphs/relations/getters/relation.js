function GraphRelationGetters(relation, direction) {

    let getters = {};
    Object.defineProperty(this, 'value', {
        'get': function () {
            return getters;
        }
    });

    let graph = new GraphRelationGraphGetters(getters, relation, direction);

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

    Object.defineProperty(this, 'fetching', {
        'get': function () {
            return relation.fetching || graph.fetching;
        }
    });
    Object.defineProperty(this, 'fetched', {
        'get': function () {
            return relation.fetched && graph.fetched;
        }
    });
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return relation.loaded && graph.loaded;
        }
    });

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

}
