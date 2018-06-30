function GraphRelations(graph, item, entity, session) {

    let relations = new Map();

    this.initialise = function () {

        entity.relations.forEach(function (specs) {
            let relation = new GraphRelation(graph, item, specs, session);
            relations.set(relation.name, relation);
        });

    };

    this.load = function (specs) {

        relations.forEach(function (relation, name) {

            if (specs[name]) {
                relation.load(specs[name]);
            }

        });

    };

}
