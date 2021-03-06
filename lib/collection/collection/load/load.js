function CollectionLoad(base) {

    let specs = new LoadSpecs();

    let loaded;
    Object.defineProperty(this, 'loaded', {
        'get': () => !!loaded,
        'set': (value) => loaded = !!value
    });
    Object.defineProperty(base, 'loaded', {'get': () => !!loaded});


    /**
     * Load items only from cache, do not fetch the item.
     * If the item is not in cache, then it will be not loaded.
     * Once the collection is fetched, then the normal process for loading the items will be processed.
     * @specs (object) The load specifications.
     */
    function loadItemsFromCache(specs) {

        // Get a "load from cache" version of the load specifications.
        // After the collection fetch, the specifications are required to be the original to
        // continue the load process.
        specs = new LoadSpecs({
            'defaults': {'update': false, 'fetch': false},
            'overwrite': true,
            'specs': specs.values
        });

        for (let item of base.items) {
            item.load(specs.items);
        }

    }

    base.load = function (params, limit, session, batcher) {

        params = (params) ? params : {};
        params.items = (typeof params.items === 'undefined') ? true : params.items;

        // Load counter
        if (params.counter) {
            base.counter.fetch(session, batcher);
        }

        specs.merge(params);

        // Load the items of the collection
        if (!loaded) {

            // Load from cache.
            loaded = base.cache.load();

            // Loaded property has changed
            if (loaded) {
                loadItemsFromCache(specs);
                base.events.trigger('change', base.instanceId);
            }

        }

        if (base.fetching) {
            return;
        }

        function onFetched() {

            let values = specs.values;
            specs.clean();

            loaded = true;
            base.events.trigger('change', base.instanceId);

            if (values.items) {
                for (let item of base.items) {
                    item.load(values.items);
                }
            }

        }

        if (loaded && !specs.update) {
            base.fetch(limit, session, false, batcher).then(onFetched);
        }
        else {

            if (typeof specs.fetch === 'undefined' || specs.fetch) {
                base.fetch(limit, session, specs.update, batcher).then(onFetched);
            }
            else {
                specs.clean();
            }

        }

    };

}
