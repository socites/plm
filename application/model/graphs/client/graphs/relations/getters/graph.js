function GraphRelationGraphGetters(getters, relation, direction) {

    let initialised;

    Object.defineProperty(this, 'graph', {
        'get': function () {
            return relation[direction];
        }
    });

    Object.defineProperty(this, 'fetching', {
        'get': function () {
            return (!initialised) ? false : this.graph.fetching;
        }
    });
    Object.defineProperty(this, 'fetched', {
        'get': function () {
            return (!initialised) ? false : this.graph.fetched;
        }
    });
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return (!initialised) ? false : this.graph.loaded;
        }
    });

    function initialise() {

        if (initialised) {
            return;
        }

        initialised = true;

        let graph = this.graph;

        if (!graph) {
            return;
        }

        // Expose properties of the related graph
        for (let property of graph.properties) {

            Object.defineProperty(getters, property, {
                'get': function () {
                    return graph.getters[property];
                }
            });

        }

    }

    function onLoaded() {
        relation.unbind('loaded', onLoaded);
        initialise();
    }

    if (relation.loaded) {
        initialise();
    } else {
        relation.bind('loaded', onLoaded);
    }

}
