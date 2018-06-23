function GraphEntity(graph) {

    // Graph entity key
    let key;

    let metamodel = module.metamodel;

    Object.defineProperty(graph, 'entity', {
        'get': function () {
            return key;
        },
        'set': function (value) {

        }
    });

}
