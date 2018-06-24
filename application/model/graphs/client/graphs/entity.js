function GraphEntity() {

    let entity;

    let metamodel = module.metamodel;

    Object.defineProperty(this, 'id', {
        'get': function () {
            return (entity) ? entity.id : undefined;
        },
        'set': function (value) {
            console.log(`setting entity id "${value}"`)
        }
    });

    Object.defineProperty(this, 'key', {
        'get': function () {
            return (entity) ? entity.key : undefined;
        },
        'set': function (value) {
            console.log(`setting entity key "${value}"`)
        }
    });

}
