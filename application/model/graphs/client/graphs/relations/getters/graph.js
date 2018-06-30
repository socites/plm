function GraphRelationGraphGetters(getters, relation, direction) {

    let graph;
    let initialised;

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

        let graph = relation[direction];
        if (!graph) {
            throw new Error(`Relation does not has its "${direction}" property`);
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
