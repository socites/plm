function Entity(entity, entities) {

    let valid = true;
    Object.defineProperty(this, 'valid', {
        'get': function () {
            return valid;
        }
    });

    if (!entity || !entity.id || !entity.name || !entity.versions) {
        console.error('Invalid entity definition', entity);
        valid = false;
        return;
    }

    Object.defineProperty(this, 'id', {
        'get': function () {
            return entity.id;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return entity.name;
        }
    });

    Object.defineProperty(this, 'storage', {
        'get': function () {
            return entity.storage;
        }
    });

    let key = (entity.id !== '1' && entity.id !== '2') ? `${entity.storage}.` : '';
    key += entity.name;
    Object.defineProperty(this, 'key', {
        'get': function () {
            return key;
        }
    });

    Object.defineProperty(this, 'versions', {
        'get': function () {
            return entity.versions;
        }
    });

    let children = new Map();
    Object.defineProperty(this, 'children', {
        'get': function () {
            return children;
        }
    });

    // Process children
    entities.map(function (child) {

        if (!child.containers) return;

        if (child.containers.hasOwnProperty(entity.id)) {

            children.set(child.id, {
                'id': child.id,
                'name': child.containers[entity.id]
            });

        }

    });

}
