function ItemLoad(item, base) {

    let cascade = new CollectionCascade();

    let loaded;
    Object.defineProperty(base, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    function onFetched() {
        // TODO: complete the load process of the item
    }

    this.load = function (specs) {

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
