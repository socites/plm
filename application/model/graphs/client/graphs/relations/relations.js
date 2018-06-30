/**
 * Wrapper of the collections that represents the relations of the graph.
 * Example, the "followers" and "following" collections.
 *
 * @param graph {object} The graph that is going to expose its relations.
 * @param item {object} The Item instance.
 * @param entity {object} The entity specification.
 * @param session {object} The plm session.
 * @constructor
 */
function GraphRelations(graph, item, entity, session) {

    let relations = new Map();

    /**
     * Initialise the relations collections
     * for any relation-entity specified in the metamodel.
     *
     * This method is called once the graph is loaded and it is possible to know
     * what is the entity of the graph.
     */
    this.initialise = function () {

        entity.relations.forEach(function (specs) {
            let relation = new GraphRelation(graph, item, specs, session);
            relations.set(relation.name, relation);
        });

    };

    /**
     * Called from the graph.load method after the graph is loaded.
     * @param specs {object} Progressive loading specification.
     */
    this.load = function (specs) {

        // Iterate the relations of the graph to progressive load the relations.
        relations.forEach(function (relation, name) {

            if (specs[name]) {
                relation.load(specs[name]);
            }

        });

    };

}
