/**
 * The getters of the graph of the relation (the from or to of the relation).
 * Example, the graph that represents a single follower or following user.
 *
 * @param getters {object} The getters that is being exposed for the relation.
 * @param relation {object} The relation item.
 * @param direction {string} 'from' or 'to' according of the entity-relation specification.
 * @constructor
 */
function GraphRelationGraphGetters(getters, relation, direction) {

    let graph;

    let initialised;
    Object.defineProperty(this, 'initialised', {
        'get': function () {
            return !!initialised;
        }
    });

    Object.defineProperty(this, 'id', {
        'get': function () {
            return (graph) ? graph.id : undefined;
        }
    });
    Object.defineProperty(this, 'fetching', {
        'get': function () {
            return (!initialised) ? false : graph.fetching;
        }
    });
    Object.defineProperty(this, 'fetched', {
        'get': function () {
            return (!initialised) ? false : graph.fetched;
        }
    });
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return (!initialised) ? false : graph.loaded;
        }
    });

    /**
     * The relation graph getters can be initialised once the graph is loaded.
     */
    function initialise() {

        graph.unbind('loaded', initialise);

        if (initialised) {
            return;
        }

        initialised = true;

        // Expose properties of the related graph
        for (let property of graph.properties) {

            Object.defineProperty(getters, property, {
                'get': function () {
                    return graph.getters[property];
                }
            });

        }

    }

    function onRelationLoaded() {

        relation.unbind('loaded', onRelationLoaded);

        graph = relation[(direction === 'from') ? 'to' : 'from'];
        graph = relation[direction];
        if (!graph) {
            throw new Error(`Relation does not has its "${direction}" property`);
        }

        (graph.loaded) ? initialise() : graph.bind('loaded', initialise);

    }

    (relation.loaded) ? onRelationLoaded() : relation.bind('loaded', onRelationLoaded);

}
