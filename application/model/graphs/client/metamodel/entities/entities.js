function Entities() {

    let entities;
    Object.defineProperty(this, 'entities', {'get': () => entities});

    this.set = function (data) {

        if (!data || !(data.entities instanceof Array) ||
            (data.relations && !(data.relations instanceof Array))) {

            console.warn('Invalid entities parameter', data);
            return;
        }

        entities = new Map();
        data.entities.map(entity => entities.set(entity.id, new Entity(entity, data)));

    };

    this.has = id => entities ? entities.has(id) : undefined;
    this.get = id => entities ? entities.get(id) : undefined;

}
