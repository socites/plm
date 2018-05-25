function CollectionLoad(collection, base) {

    function onFetched(specs) {

        if (specs.items) {
            for (let entry of collection.entries) {
                entry.load(specs.items);
            }
        }

    }

    collection.load = function (specs) {

        specs = (specs) ? specs : {};
        specs.items = (typeof specs.items === 'undefined') ? true : specs.items;

        collection.fetch().promise.then(function () {
            onFetched(specs);
        });

    };

}
