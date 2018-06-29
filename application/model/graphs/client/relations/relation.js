function Relation(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    function initialise() {

        let fields = er.fields.slice();
        fields.unshift('entity_relation');
        fields.unshift('from');
        fields.unshift('to');

        // Initialise fields and maps
        let maps = {
            'from': {'source': 'from_id', 'Item': Graph},
            'to': {'source': 'to_id', 'Item': Graph}
        };
        er.fields.map(function (field) {
            maps[field] = field
        });

        item.initialise({
            'fields': er.fields,
            'maps': maps
        });

    }

    let er = new EntityRelation(this);
    Object.defineProperty(this, 'entityRelation', {
        'get': function () {
            return er.key;
        },
        'set': function (value) {
            er.set(value);
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

}
