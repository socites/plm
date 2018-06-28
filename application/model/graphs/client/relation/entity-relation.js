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

        let key = value.split('.');

        let id, storage, name, version;

        if (key.length === 3) {

            storage = key[0];
            name = key[1];
            version = key[2];

        } else if (key.length === 2) {

            // There are two options:
            //   1. entity.version
            //   2. storage.entity

            if (/^[0-9]*$/.test(key[1])) {

                // In this case, entity can be the id, or the name
                if (/^[0-9]*$/.test(key[0])) {
                    id = key[0];
                } else {
                    storage = 'social-graphs';
                    name = key[0];
                }

                version = key[1];

            } else {

                storage = key[0];
                name = key[1];

            }

        } else if (key.length === 1) {

            // In this case, entity can be the id, or the name
            if (/^[0-9]*$/.test(key[0])) {
                id = key[0];
            } else {
                storage = 'social-graphs';
                name = key[0];
            }

        } else {
            console.error('Invalid entity value', value);
            throw new Error('Invalid entity value');
        }

        if (!id) {

        }

        version = (version) ? version : 'highest';
        if (id && !/^[0-9]*$/.test(id)) {
            console.error('Invalid entity id', id);
            throw new Error('Invalid entity id');
        }

        let relation = metamodel.relations.get(id);
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
