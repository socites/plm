function GraphRelations(graph, item, entity, session) {

    let relations = new Map();

    this.initialise = function () {

        entity.relations.forEach(function (relation) {

            // Create relation collection
            let specs = {'entityRelationId': relation.id};
            specs[relation.direction] = entity.id;
            let collection = new Relations(specs, session, {'batch': relation.direction});
            collection.bind('change', item.triggerChange);

            // Expose child collection
            Object.defineProperty(graph, relation.name, {
                'get': function () {
                    return collection;
                }
            });

            // Expose child getters
            Object.defineProperty(graph.getters, relation.name, {
                'get': function () {
                    return collection.getters;
                }
            });

            relations.set(relation.name, {'specs': relation, 'collection': collection});

        });

    };

    this.load = function (specs) {

        relations.forEach(function (relation, name) {

            if (specs[name]) {
                relation.collection.load(specs[name]);
            }

        });

    };

}
