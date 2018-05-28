function ItemLoad(item, base) {

    let cascade = new CollectionCascade();

    function onFetched() {

    }

    this.load = function (specs) {

        cascade.merge(specs);

        if (base.fetching) {
            return;
        }

        if (base.loaded && !specs.update) {
            onFetched();
        }
        else {

            base.fetch().promise.then(function () {
                onFetched();
            });

        }

    };

}
