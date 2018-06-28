function Relation(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    function initialise() {

        // Initialise fields and maps
        let maps = {};
        entityRelation.fields.map(function (field) {
            if (field === 'entity') return;
            maps[field] = field
        });

        item.initialise({
            'fields': entityRelation.fields,
            'maps': maps
        });

    }

    let entityRelation = new GraphEntity(this);
    Object.defineProperty(this, 'entityRelation', {
        'get': function () {
            return entityRelation.key;
        },
        'set': function (value) {
            entityRelation.set(value);
        }
    });

    let children = new GraphChildren(this, item, entity, session);
    let relations = new GraphRelations(this, item, entity, session);

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
