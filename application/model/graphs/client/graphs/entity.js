function GraphEntity() {

    let entity;

    let initialised;
    Object.defineProperty(this, 'initialised', {'get': () => !!initialised});

    let fields, children, relations;
    Object.defineProperty(this, 'fields', {'get': () => fields});
    Object.defineProperty(this, 'children', {'get': () => children});
    Object.defineProperty(this, 'relations', {'get': () => relations});

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

    Object.defineProperty(this, 'id', {'get': () => key.id});
    Object.defineProperty(this, 'version', {'get': () => key.version});
    Object.defineProperty(this, 'storage', {'get': () => entity.storage});
    Object.defineProperty(this, 'name', {'get': () => entity.name});

}
