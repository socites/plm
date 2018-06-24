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

    let metamodel = module.metamodel;

    function set(value) {

        if (!metamodel.loaded) {
            throw new Error('Metamodel must be loaded before setting the entity of the graph.');
        }

        let key = value.split('.');

        let id, storage, name, version;

        if (key.length === 3) {
            storage = key[0];
            name = key[1];
            version = key[2];
        } else if (key.length === 2) {
            id = key[0];
            version = key[1];
        } else if (key.length === 1) {
            id = key[0];
        } else {
            console.error('Invalid entity value', value);
            throw new Error('Invalid entity value');
        }

        version = (version) ? version : 'highest';
        if (id && !/^[0-9]*$/.test(id)) {
            console.error('Invalid entity id', id);
            throw new Error('Invalid entity id');
        }

        let entity = metamodel.entities.get(id);
        if (!entity.versions[version]) {
            console.error('Invalid entity version', value);
            throw new Error('Invalid entity version');
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
