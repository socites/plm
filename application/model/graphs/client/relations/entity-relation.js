function RelationEntityRelation() {

    let relation;

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

    let metamodel = module.metamodel;

    function set(value) {

        if (!metamodel.loaded) {
            throw new Error('Metamodel must be loaded before setting the entity relation.');
        }

        key = new MetamodelKey(value);
        if (key.error) {
            throw new Error(`Invalid entity relation "${value}"`);
        }

        relation = key.find(metamodel.relations);
        if (!relation) {
            throw new Error(`Entity relation "${value}" not found`);
        }

        let version = relation.versions.get(key.version);
        if (!version) {
            throw new Error(`Version of entity relation "${value}" not found`);
        }

        fields = version.fields;

    }

    let key;
    Object.defineProperty(this, 'key', {
        'get': function () {
            return key.value;
        },
        'set': function (value) {

            if (initialised) {
                throw new Error('Relation already set');
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
            return relation.storage;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return relation.name;
        }
    });

}
