function EntityRelation(relation) {

    let valid = true;
    Object.defineProperty(this, 'valid', {'get': () => valid});

    if (!relation || !relation.id || !relation.name || !relation.versions) {
        console.error('Invalid relation definition', relation);
        valid = false;
        return;
    }

    Object.defineProperty(this, 'id', {'get': () => relation.id});
    Object.defineProperty(this, 'name', {'get': () => relation.name});
    Object.defineProperty(this, 'storage', {'get': () => relation.storage});

    let versions = new Versions(relation.versions);
    Object.defineProperty(this, 'versions', {'get': () => versions});

}
