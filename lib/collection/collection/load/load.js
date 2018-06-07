function CollectionLoad(base) {

    let specs = new LoadSpecs();

    let loaded;
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return !!loaded;
        },
        'set': function (value) {
            loaded = !!value;
        }
    });
    Object.defineProperty(base, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    function onFetched(specs) {

        if (specs.items) {
            for (let item of base.items) {
                item.load(specs.items);
            }
        }

    }

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
            'specs': specs
        });

        for (let item of base.items) {
            item.load(specs.items);
        }

    }

    base.load = function (params) {

        params = (params) ? params : {};
        params.items = (typeof params.items === 'undefined') ? true : params.items;

        specs.merge(params);

        if (!loaded) {

            // Load from cache.
            loaded = base.cache.load();

            // Loaded property has changed.
            if (loaded) {
                base.events.trigger('change');
            }

        }

        if (loaded) {
            loadItemsFromCache(specs);
        }

        if (base.fetching) {
            return;
        }

        if (loaded && !specs.update) {

            let values = specs.values;
            specs.clean();
            onFetched(values);

        }
        else {

            if (typeof specs.fetch === 'undefined' || specs.fetch) {

                base.fetch().then(function () {

                    let values = specs.values;
                    specs.clean();

                    loaded = true;
                    base.events.trigger('change');

                    onFetched(values);

                });

            } else {
                specs.clean();
            }

        }

    };

}
