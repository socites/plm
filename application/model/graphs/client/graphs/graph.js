function Graph(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    let self = this;

    function initialise() {

        let fields = entity.fields.slice();
        fields.unshift('entity');

        // Initialise fields and maps
        let maps = {};
        entity.fields.map(function (field) {
            maps[field] = field
        });

        // If not an application
        if (entity.id !== '1') {
            fields.unshift('application_id');
            maps.application = {'source': 'application_id', 'Item': Graph, 'immutable': true};
        }

        // If not a user
        if (entity.id !== '2') {
            fields.unshift('owner_id');
            maps.owner = {'source': 'owner_id', 'Item': Graph, 'immutable': true};
        }

        if (entity.id !== '1' && entity.id !== '2') {
            fields.unshift('container_id');
            maps.container = {'source': 'container_id', 'Item': Graph, 'immutable': true};
        }

        item.initialise({
            'fields': fields,
            'maps': maps
        });

        // Expose entity on getters
        Object.defineProperty(self.getters, 'entity', {
            'get': function () {

                if (!entity.initialised) {
                    return;
                }

                return {
                    'id': entity.id,
                    'version': entity.version,
                    'key': entity.key,
                    'storage': entity.storage,
                    'name': entity.name
                };

            }
        });

        // Initialise children
        children.initialise();
        relations.initialise();

    }

    let entity = new GraphEntity();
    Object.defineProperty(this, 'entity', {
        'get': function () {
            return entity.key;
        },
        'set': function (value) {
            entity.set(value);
        }
    });

    let children = new GraphChildren(this, item, entity, session);
    let relations = new GraphRelations(this, item, entity, session);

    entity.onSet = initialise;

    // Initialise the graph by setting its entity
    if (this.loaded) {

        // If the graph is already loaded, then set the entity
        entity.key = item.data.entity;

    } else {

        // Wait for the data to be loaded.
        // The first load execution of a graph instance is responsible to
        // initialise the fields (that are required by the base).
        item.onLoaded = function (data) {

            if (!data) {
                entity.key = item.data.entity;
                return;
            }

            if (!data.entity) {
                console.error('data.entity not set', data);
                return false;
            }

            entity.key = data.entity;

            // Once the entity is set, it is not required to continue executing this function
            item.onLoaded = undefined;

        };

    }

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
