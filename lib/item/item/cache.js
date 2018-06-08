function ItemCache(base, registry) {
    "use strict";

    let id = (registry.cache) ? `item.${registry.cache}.${base.id}` : undefined;
    let storage = module.cache.get(id);

    this.load = function () {

        if (!id) {
            // This item do not support cache
            return;
        }

        let data = storage.data;

        if (data) {
            base.data.set(data);
        }

        return !!data;

    };

    this.save = function () {

        if (!base.fetched && !base.published) {
            // The cache saves the published values, if the item is not loaded
            // then there is nothing to save to cache
            return;
        }

        if (!id) {
            // This item do not support cache
            return;
        }

        storage.data = base.toJSON();

    };

}
