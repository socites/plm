function MetamodelKey(value) {

    let key = value.split('.');

    Object.defineProperty(this, 'value', {
        'get': function () {
            return value;
        }
    });

    let id, storage, name, version;
    Object.defineProperty(this, 'id', {
        'get': function () {
            return id;
        }
    });
    Object.defineProperty(this, 'storage', {
        'get': function () {
            return storage;
        }
    });
    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });
    Object.defineProperty(this, 'version', {
        'get': function () {
            return version;
        }
    });

    Object.defineProperty(this, 'valid', {
        'get': function () {
            return !!((id || (storage && name)) && version);
        }
    });

    if (key.length === 3) {

        storage = key[0];
        name = key[1];
        version = key[2];

    } else if (key.length === 2) {

        // There are two options:
        //   1. item.version
        //   2. storage.name

        if (/^[0-9]*$/.test(key[1])) {

            // In this case, item can be the id, or the name
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

        // In this case, item can be the id, or the name
        if (/^[0-9]*$/.test(key[0])) {
            id = key[0];
        } else {
            storage = 'social-graphs';
            name = key[0];
        }

    } else {
        console.error('Invalid key value', value);
    }

    version = (version) ? version : 'highest';

    /**
     * Find an entity or relation from a map of entities or relations.
     *
     * @param map {Map} The map of entities or relations.
     * @returns {*} The entity or relation, or undefined if not found.
     */
    this.find = function (map) {

        if (!map) {
            return;
        }

        if (!this.valid) {
            console.warn('Trying to find an item from an invalid key', this);
            return;
        }

        if (id) {
            return map.get(id);
        }

        // Find by storage and name
        map.forEach(function (item) {
            if (item.storage === storage && item.name === name) {
                id = item.id;
            }
        });

        if (!id) {
            return;
        }

        return map.get(id);

    };

}
