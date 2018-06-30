function GraphEntity() {

    let entity;

    let initialised;
    Object.defineProperty(this, 'initialised', {
        'get': function () {
            return !!initialised;
        }
    });

    let fields;
    Object.defineProperty(this, 'fields', {
        'get': function () {
            return fields;
        }
    });

    let children;
    Object.defineProperty(this, 'children', {
        'get': function () {
            return children;
        }
    });

    let relations;
    Object.defineProperty(this, 'relations', {
        'get': function () {
            return relations;
        }
    });

    let metamodel = module.metamodel;

    function set(value) {

        if (!metamodel.loaded) {
            throw new Error('Metamodel must be loaded before setting the entity of the graph.');
        }

        key = new MetamodelKey(value);
        if (key.error) {
            throw new Error(`Invalid entity "${value}"`);
        }

        entity = key.find(metamodel.entities);
        if (!entity) {
            throw new Error(`Entity "${value}" not found`);
        }

        let version = entity.versions.get(key.version);
        if (!version) {
            throw new Error(`Entity version "${key.version}" of entity "${key.id}" not found`);
        }

        fields = version.fields;
        children = entity.children;
        relations = entity.relations;

    }

    let key;
    Object.defineProperty(this, 'key', {
        'get': function () {
            return key.value;
        },
        'set': function (value) {

            if (initialised) {
                throw new Error('Entity already set');
            }
            initialised = true;

            set(value);

            if (typeof this.onSet === 'function') {
                this.onSet();
            }

        }
    });

    Object.defineProperty(this, 'id', {
        'get': function () {
            return key.id;
        }
    });

    Object.defineProperty(this, 'version', {
        'get': function () {
            return key.version;
        }
    });

    Object.defineProperty(this, 'storage', {
        'get': function () {
            return entity.storage;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return entity.name;
        }
    });

}
