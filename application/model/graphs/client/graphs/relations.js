function GraphRelations(graph, item, entity, session) {

    let relations = {};

    this.initialise = function () {

        entity.relations.forEach(function (relation) {

            // Create relation collection
            let specs = {'entityRelationId': relation.id};
            specs[relation.direction] = entity.id;

            let collection = new GraphsRelations();

        });

    };

    this.load = function (specs) {

    };

}
