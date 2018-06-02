function ItemLoad(base) {
    "use strict";

    let specs = new ItemLoadSpecs();

    let loaded;
    Object.defineProperty(base, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    function onFetched() {
        // TODO: complete the load process of the item
    }

    base.load = function (params) {

        specs.merge(params);

        if (!loaded) {
            loaded = base.cache.load();
            (loaded) ? base.events.trigger('change') : undefined;
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
