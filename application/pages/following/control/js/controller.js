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

    // Relation from user with id='1' following user with id='4'
    relation.set('1', '4').then(function () {
        console.log('relation found');
    });

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}
