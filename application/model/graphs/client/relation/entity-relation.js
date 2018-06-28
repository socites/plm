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

        let key = new MetamodelKey(value);
        if (key.error) {
            console.log(`Invalid entity relation "${value}"`);
            throw new Error('Invalid entity relation');
        }

        let relation = metamodel.relations.get(key);
        if (!relation.versions[version]) {
            let message = `Invalid relation version "${value}"`;
            console.error(message, relation);
            throw new Error(message);
        }

        fields = entity.versions[version].fields;

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
