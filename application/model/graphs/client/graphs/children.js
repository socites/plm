function GraphChildren(graph, item, entity, session) {

    let children = {};

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
            children[child.name] = new Graphs(specs, session, {'batch': 'container'});

            children[child.name].bind('change', item.triggerChange);

            Object.defineProperty(graph, child.name, {
                'get': function () {
                    return children[child.name];
                }
            });

        });

    };

    this.load = function (specs) {

    };

}
