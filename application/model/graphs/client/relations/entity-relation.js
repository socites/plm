function EntityRelation() {

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
            console.log(`Invalid entity relation "${value}"`);
            throw new Error('Invalid entity relation');
        }

        let relation = key.find(metamodel.relations);
        if (!relation) {
            let message = `Entity relation "${value}" not found`;
            throw new Error(message);
        }

        let version = relation.get(key.version);
        if (!version) {
            let message = `Version of entity relation "${value}" not found`;
            throw new Error(message);
        }

        fields = version.fields;

    }

    let key;
    Object.defineProperty(this, 'key', {
        'get': function () {
            return key;
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

}
