function CollectionLoad(base, exports) {
    "use strict";

    exports.load = function (specs) {

        specs = (specs) ? specs : {};

        function loadItems(specs) {

            if (!specs.items) {
                return;
            }

            // load items
            for (var index in exports.entries) {

                var entry = exports.entries[index];
                entry.load(specs.items);

            }

        }

        var loadMore = exports.loaded;

        if (!exports.loaded) {
            exports.loadFromCache();
            loadItems(specs);
        }

        if (loadMore || !exports.loaded || specs.update) {
            return base.fetch()
                .then(Delegate(loadItems, specs));
        }
        else if (specs.items) {
            loadItems(specs);
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }

    };

    exports.refresh = function (specs) {

        specs = (specs) ? specs : {};

        exports.clean({'avoidChangeEvent': true});
        specs.update = true;
        exports.load(specs);

        base.events.trigger('change');

    };

}
