function Actions(controller, properties) {

    // Add relation
    this.add = function () {

        let relation = controller.relation;

        relation.entityRelation = '1';
        relation.from = '1';
        relation.to = '4';
        relation.is = 'my friend';

        relation.publish({'session': 'session.key.default'});

    };

    // Update relation
    this.remove = function () {

        let relation = controller.relation;

        // Relation from user with id='1' following user with id='4'
        // The third parameter is the entity relation id='1'
        relation.set('1', '4', '1').then(function (found) {
            console.log(`Relation ${(found) ? 'has been' : 'not'} found`);
            if (found) {
                relation.remove({'session': 'session.key.default'});
            }
        });

    };

}
