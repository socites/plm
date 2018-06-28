function Relations() {

    let relations;
    Object.defineProperty(this, 'relations', {
        'get': function () {
            return relations;
        }
    });

    this.set = function (data) {

        if (!(data instanceof Array)) {
            console.warn('Invalid relations parameter', data);
            return;
        }

        relations = new Map();
        data.map(relation => relations.set(relation.id, new Relation(relation)));

    };

    this.has = function (id) {
        return (relations) ? relations.has(id) : undefined;
    };

    this.get = function (value) {

        if (!relations) {
            return;
        }


    };

}
