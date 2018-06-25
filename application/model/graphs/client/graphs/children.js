function GraphChildren(graph, item, entity, session) {

    let children = new Map();

    /*
    let comments = new Graphs({'container': this, 'entity': '22'}, session, {'batch': 'container'});
    Object.defineProperty(this, 'comments', {
        'get': function () {
            return comments;
        }
    });
    comments.bind('change', item.triggerChange);
    */

    this.initialise = function () {

        entity.children.forEach(function (child) {

            // Create child collection
            let specs = {'container': graph, 'entity': child.id};
            let collection = new Graphs(specs, session, {'batch': 'container'});

            collection.bind('change', item.triggerChange);

            // Expose child collection
            Object.defineProperty(graph, child.name, {
                'get': function () {
                    return collection;
                }
            });

            // Expose child getters
            Object.defineProperty(graph.getters, child.name, {
                'get': function () {
                    return collection.getters;
                }
            });

            children.set(child.name, {'specs': child, 'collection': collection});

        });

    };

    this.load = function (specs) {

        children.forEach(function (child, name) {

            if (specs[name]) {
                child.collection.load(specs[name]);
            }

        });

    };

}
