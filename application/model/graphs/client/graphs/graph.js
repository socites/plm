function Graph(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    function initialise() {

        item.initialise({
            'fields': ['time_updated', 'description'],
            'maps': {
                'timeUpdated': {'source': 'time_updated', 'readOnly': true},
                'description': {'source': 'description'}
            }
        });

    }

    let entity = new GraphEntity(this);

    entity.onSet = initialise;
    item.onFetched = initialise;

    let children = new GraphChildren();
    let relations = new GraphRelations();

    this.load = function (specs) {

        let metamodel = module.metamodel;
        metamodel.load()
            .then(function () {
                return item.load(specs);
            })
            .then(function (specs) {
                children.load(specs);
                relations.load(specs);
            });

    };

}
