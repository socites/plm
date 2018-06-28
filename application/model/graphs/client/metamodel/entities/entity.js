/**
 * Entity
 *
 * @param entity The entity data
 * @param metamodel {object} The metamodel data
 * @constructor
 */
function Entity(entity, metamodel) {

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

    let versions = new Versions(entity.versions);
    Object.defineProperty(this, 'versions', {
        'get': function () {
            return versions;
        }
    });

    let children = new Map();
    Object.defineProperty(this, 'children', {
        'get': function () {
            return children;
        }
    });

    // Process children
    metamodel.entities.map(function (child) {

        if (!child.containers) return;

        if (child.containers.hasOwnProperty(entity.id)) {

            children.set(child.id, {
                'id': child.id,
                'name': child.containers[entity.id]
            });

        }

    });

    let relations = new Map();
    Object.defineProperty(this, 'relations', {
        'get': function () {
            return relations;
        }
    });

    // Process relations
    metamodel.relations.map(function (relation) {

        if (!relation.from || !relation.to) {
            console.error('Invalid relation definition, from or to not set', relation);
            return;
        }

        if (!relation.versions) {
            console.error('Invalid relation definition, versions not set', relation);
            return;
        }

        let from = relation.from, to = relation.to;

        if (!from.entity || !to.entity) {
            console.error('Invalid relation definition, entity not correctly set', relation);
            return;
        }

        if (from.entity === entity.id) {
            relations.set(from.name, {
                'id': relation.id,
                'name': from.name,
                'direction': 'from',
                'versions': relation.versions
            });
        }

        if (to.entity === entity.id) {
            relations.set(to.name, {
                'id': relation.id,
                'name': to.name,
                'direction': 'to',
                'versions': relation.versions
            });
        }

    });

}
