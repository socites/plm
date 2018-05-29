function CollectionLoad(base) {

    let specs = new CollectionLoadSpecs();

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

    base.load = function (params) {

        params = (params) ? params : {};
        params.items = (typeof params.items === 'undefined') ? true : params.items;

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
