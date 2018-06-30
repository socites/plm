/**
 * This object wraps the collection of relations.
 *
 * @param graph {object} The graph
 * @param item {object} The item
 * @param relation {object} The entity relation specifications
 * @param session {object} The plm session
 * @constructor
 */
function GraphRelation(graph, item, relation, session) {

    Object.defineProperty(this, 'name', {
        'get': function () {
            return relation.name;
        }
    });

    let collection;
    Object.defineProperty(this, 'collection', {
        'get': function () {
            return collection;
        }
    });

    // Create relation collection
    let attributes = {'entityRelationId': relation.id};
    attributes[relation.direction] = graph.id;
    collection = new Relations(attributes, session, {'batch': relation.direction});

    // Bind to change events
    collection.bind('change', item.triggerChange);

    // Expose child collection
    Object.defineProperty(graph, relation.name, {
        'get': function () {
            return collection;
        }
    });

    // Expose child getters
    let getters = new GraphRelationsGetters(this, relation.direction);
    Object.defineProperty(graph.getters, relation.name, {
        'get': function () {
            return getters.value;
        }
    });

    /**
     * Progressive loading of the items of the collection.
     * Automatically loads the graph-from or graph-to according of the direction of the relation.
     * @param specs
     */
    this.load = function (specs) {

        // If direction is from, then load the to of the relation
        let key = (relation.direction === 'from') ? 'to' : 'from';
        specs[key] = specs.graph;

        delete specs.graph;

        specs[key] = (typeof specs[key] === 'undefined') ? true : specs[key];

        collection.load(specs);

    };

}
