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

        if (base.fetching) {
            return;
        }

        if (loaded && !specs.update) {
            onFetched();
        }
        else {

            base.fetch().then(function () {
                loaded = true;
                base.events.trigger('change');
                onFetched();
            });

        }

    };

}
