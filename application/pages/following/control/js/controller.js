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
    // The third parameter is the entity relation id='1'
    relation.set('1', '4', '1').then(function (found) {
        console.log('relation found', found);
    });


    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}
