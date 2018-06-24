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
    Object.defineProperty(this, 'entity', {
        'get': function () {
            return entity.id;
        },
        'set': function (value) {
            if (/^[0-9]*$/.test(value)) {
                entity.id = value;
            } else {
                entity.key = value;
            }
        }
    });

    entity.onSet = initialise;
    item.onLoaded = function (data) {

        if (!data.entity) {
            console.error('data.entity_id not set', data);
            return;
        }

        entity.id = data.entity;

        // Once the entity is set, it is not required to continue executing this function
        item.onLoaded = undefined;

    };

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
