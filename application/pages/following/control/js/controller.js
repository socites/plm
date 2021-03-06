function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    let relation = new model.Relation();
    Object.defineProperty(this, 'relation', {
        'get': function () {
            return relation;
        }
    });

    relation.bind('change', change);

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}
