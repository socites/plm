function CollectionLoad(base) {

    let cascade = new CollectionCascade();

    let loaded;
    Object.defineProperty(base, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    function onFetched() {

        if (cascade.items) {
            for (let entry of base.entries) {
                entry.load(cascade.items);
            }
        }

    }

    base.load = function (specs) {

        specs = (specs) ? specs : {};
        specs.items = (typeof specs.items === 'undefined') ? true : specs.items;

        cascade.merge(specs);

        if (base.fetching) {
            return;
        }

        if (loaded && !specs.update) {
            onFetched();
        }
        else {

            base.fetch().promise.then(function () {
                loaded = true;
                base.events.trigger('change');
                onFetched();
            });

        }

    };

}
