function Entities() {

    let entities;
    Object.defineProperty(this, 'entities', {
        'get': function () {
            return entities;
        }
    });

    this.set = function (data) {

        if (!(data instanceof Array)) {
            console.warn('Invalid entities parameter', data);
            return;
        }

        entities = new Map();
        data.map(entity => entities.set(entity.id, new Entity(entity)));

    };

    this.has = function (id) {
        return (entities) ? entities.has(id) : undefined;
    };

    this.get = function (id) {
        return (entities) ? entities.get(id) : undefined;
    };

}
