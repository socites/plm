function GraphEntity() {

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
            console.log(`Invalid entity relation "${value}"`);
            throw new Error('Invalid entity relation');
        }

        let entity = key.find(metamodel.entities);
        if (!entity) {
            let message = `Entity "${value}" not found`;
            console.error(message, value);
            throw new Error(message);
        }

        let version = entity.get(key.version);
        if (!version) {
            let message = `Entity version "${value}" not found`;
            console.error(message, value);
            throw new Error(message);
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

}
