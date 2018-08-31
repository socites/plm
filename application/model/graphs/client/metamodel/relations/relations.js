function EntitiesRelations() {

    let relations;
    Object.defineProperty(this, 'relations', {'get': () => relations});

    this.set = function (data) {

        if (!(data instanceof Array)) {
            console.warn('Invalid relations parameter', data);
            return;
        }

        relations = new Map();
        data.map(relation => relations.set(relation.id, new EntityRelation(relation)));

    };

    this.has = id => relations ? relations.has(id) : undefined;
    this.get = id => relations ? relations.get(id) : undefined;

}
