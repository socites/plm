function CacheStore(base) {
    "use strict";

    var data;
    Object.defineProperty(this, 'data', {
        'get': function () {
            return data;
        },
        'set': function (value) {

            if (!initialised) {
                this.initialise();
            }

            // Overwrite the cached data
            data = value;
            localStorage.setItem(base.cacheId, JSON.stringify(data));

        }
    });

    var initialised;
    Object.defineProperty(this, 'initialised', {
        'get': function () {
            return !!initialised;
        }
    });

    this.load = function () {

        if (!base.cacheId) {
            throw new Error('Collection cacheId not set');
        }

        // Get the id of the collection used in in the cache stored
        var cached = localStorage.getItem(base.cacheId);
        if (cached) {

            try {
                var parsed = JSON.parse(cached);
                cached = parsed;
            }
            catch (exc) {
                console.warn('Collection cache is invalid', base.cacheId, cached);
                console.warn(exc.stack);
                this.clean();
                return;
            }

            data = cached;

        }

        initialised = true;

    };

    this.clean = function () {
        localStorage.removeItem(base.cacheId);
    };

}
