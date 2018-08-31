/**
 * The getters of the item of the relations collection.
 *
 * @param relation {object} The relation item.
 * @param direction {string} 'from' or 'to'.
 * @constructor
 */
function GraphRelationGetters(relation, direction) {

    let getters = {};
    Object.defineProperty(this, 'value', {'get': () => getters});

    let initialised;
    Object.defineProperty(getters, 'initialised', {'get': () => !!initialised && !!graph.initialised});

    let graph = new GraphRelationGraphGetters(getters, relation, direction);

    Object.defineProperty(getters, 'relation', {
        'get': function () {
            return {
                'id': relation.id,
                'direction': direction
            };
        }
    });

    Object.defineProperty(getters, 'id', {'get': () => graph.id});

    Object.defineProperty(getters, 'instanceId', {'get': () => relation.instanceId});

    Object.defineProperty(this, 'fetching', {'get': () => relation.fetching || graph.fetching});
    Object.defineProperty(this, 'fetched', {'get': () => relation.fetched && graph.fetched});
    Object.defineProperty(this, 'loaded', {'get': () => relation.loaded && graph.loaded});

    /**
     * The relation getters can be initialised once the relation is loaded.
     */
    function initialise() {

        relation.unbind('loaded', initialise);

        if (initialised) {
            throw new Error('Relation getters already initialised');
        }

        initialised = true;

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

    (relation.loaded) ? initialise() : relation.bind('loaded', initialise);

}
