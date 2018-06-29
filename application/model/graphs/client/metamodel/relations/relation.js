function EntityRelation(relation) {

    let valid = true;
    Object.defineProperty(this, 'valid', {
        'get': function () {
            return valid;
        }
    });

    if (!relation || !relation.id || !relation.name || !relation.versions) {
        console.error('Invalid relation definition', relation);
        valid = false;
        return;
    }

    Object.defineProperty(this, 'id', {
        'get': function () {
            return relation.id;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return relation.name;
        }
    });

    Object.defineProperty(this, 'storage', {
        'get': function () {
            return relation.storage;
        }
    });

    let versions = new Versions(relation.versions);
    Object.defineProperty(this, 'versions', {
        'get': function () {
            return versions;
        }
    });

}
