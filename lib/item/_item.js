function _item() {

    var internalId = 0;

    return function (specs) {
        "use strict";

        var batch = new ItemBatchFetch(specs);

        return function (object, id) {
            "use strict";

            var base = new ModelBase(object);
            var properties = base.properties;
            properties.expose(['id', 'updated', 'loaded', 'internalId', 'error']);

            properties.loaded = false;
            properties.updated = false;

            Object.defineProperty(this, 'events', {
                'get': function () {
                    return base.events;
                }
            });

            Object.defineProperty(this, 'properties', {
                'get': function () {
                    return base.properties;
                }
            });

            properties.internalId = ++internalId;
            properties.id = id;

            var cache = new ItemCache(item);

            new ItemFetch(batch, base, object);

        };

    };

}

_item = _item();
