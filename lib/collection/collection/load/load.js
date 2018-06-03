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

    function onFetched() {

        if (specs.items) {
            for (let entry of base.entries) {
                entry.load(specs.items);
            }
        }

    }

    /**
     * Load an entry only from cache, do not fetch the item if it is not cached
     * @param entry The entry to be loaded
     * @param specs The specs.items
     */
    function loadEntryFromCache(entry, specs) {

        if (!specs) {
            return;
        }

        specs = (typeof specs === 'boolean') ? {} : specs;
        specs = Object.assign(specs, {'update': false, 'fetch': false});

        entry.load(specs);

    }

    base.load = function (params) {

        params = (params) ? params : {};
        params.items = (typeof params.items === 'undefined') ? true : params.items;

        specs.merge(params);

        if (!loaded) {
            loaded = base.cache.load();
        }

        if (loaded) {
            for (let entry of base.entries) {
                loadEntryFromCache(entry, specs.items);
            }
        }

        if (base.fetching) {
            return;
        }

        if (loaded && !specs.update) {
            onFetched();
        }
        else {

            if (typeof specs.fetch === 'undefined' || specs.fetch) {

                base.fetch().then(function () {
                    loaded = true;
                    specs.clean();
                    base.events.trigger('change');
                    onFetched();
                });

            } else {
                specs.clean();
            }

        }

    };

}
