function Graph(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    function initialise() {

        let maps = {};
        entity.fields.map(function (field) {
            if (field === 'entity') return;
            maps[field] = field
        });

        item.initialise({
            'fields': entity.fields,
            'maps': maps
        });

    }

    let entity = new GraphEntity(this);
    Object.defineProperty(this, 'entity', {
        'get': function () {
            return entity.key;
        },
        'set': function (value) {
            entity.set(value);
        }
    });

    entity.onSet = initialise;

    item.onLoaded = function (data) {

        if (!data.entity) {
            console.error('data.entity not set', data);
            return;
        }

        entity.key = data.entity;

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
