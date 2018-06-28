function MetamodelKey(value) {

    let key = value.split('.');

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

    this.find = function (map) {

        if (!id || (!storage && !name)) {
            console.warn('Key is not valid.', this);
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

        return map.get(id);

    };

}
