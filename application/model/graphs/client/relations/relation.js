function Relation(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    let self = this;

    function initialise() {

        let fields = er.fields.slice();
        fields.unshift('entity_relation');
        fields.unshift('from_id');
        fields.unshift('to_id');

        // Initialise fields and maps
        let maps = {
            'from': {'source': 'from_id', 'Item': Graph, 'immutable': true},
            'to': {'source': 'to_id', 'Item': Graph, 'immutable': true}
        };
        er.fields.map(function (field) {
            maps[field] = field
        });

        item.initialise({
            'fields': fields,
            'maps': maps
        });

        // Set the entity relation id to its data field
        item.data.entity_relation = er.id;

        // Expose entity relation on getters
        Object.defineProperty(self.getters, 'entityRelation', {
            'get': function () {

                if (!er.initialised) {
                    return;
                }

                return {
                    'id': er.id,
                    'version': er.version,
                    'key': er.key,
                    'storage': er.storage,
                    'name': er.name
                };

            }
        });

    }

    let er = new RelationEntityRelation();
    Object.defineProperty(this, 'entityRelation', {
        'get': function () {
            return er.key;
        },
        'set': function (value) {
            er.key = value;
        }
    });

    er.onSet = initialise;

    item.onLoaded = function (data) {

        if (!data.entity_relation) {
            console.error('data.entity_relation not set', data);
            return false;
        }

        er.key = data.entity_relation;

        // Once the entity relation is set, it is not required to continue executing this function
        item.onLoaded = undefined;

    };

    this.load = function (specs) {

        let metamodel = module.metamodel;
        metamodel.load()
            .then(function () {
                return item.load(specs);
            })
            .then(function (specs) {

                if (specs.from) {
                    item.from.load(specs.from);
                }

                if (specs.to) {
                    item.to.load(specs.to);
                }

            });

    };

    new RelationSet(this, item);

}
