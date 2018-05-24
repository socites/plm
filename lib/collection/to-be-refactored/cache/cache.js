function Cache(base, exports) {
    "use strict";

    var cache = new CacheStore(base);
    Object.defineProperty(base, 'cache', {
        'get': function () {
            return cache;
        }
    });

    exports.loadFromCache = function (specs) {

        if (!base.cacheId) {
            // Collection does not implements cache
            return;
        }

        if (exports.loaded) {
            console.warn('Loading collection from cache, but the collection has been previously loaded. ' +
                'Check to clean it before loading from cache.');
        }

        cache.load();
        if (cache.data) {

            if (exports.loaded) {
                exports.clean({'avoidChangeEvent': true});
            }

            var items = [];
            for (var id in cache.data) {
                items.push({'id': id, 'timeUpdated': cache.data[id]});
            }

            // Load only the first page of results
            items = items.splice(0, base.limit);

            for (var index in items) {

                var item = items[index];

                // The '!' is a php hack to avoid the array to be ordered
                var itemId = item.id.replace('!', '');

                item = base.Item(itemId, item.timeUpdated);
                if (!item.loaded) {
                    item.loadFromCache();
                }

                base.setEntry(itemId, item);

            }

            base.loaded = true;
            base.dataSource = DATA_SOURCE.CACHE;

            if (!specs || !specs.avoidChangeEvent) {
                base.events.trigger('change');
            }

        }

    };

    base.updateCache = function () {

        if (!base.cacheId) {
            // Collection does not implements cache
            return;
        }

        var data = {};
        base.entries.forEach(function (item) {

            // The '!' is a hack to avoid the array to be ordered
            data[item.id + '!'] = item.timeUpdated;

        });
        cache.data = data;

    };

    exports.cleanCache = function () {
        cache.clean();
    };

}
