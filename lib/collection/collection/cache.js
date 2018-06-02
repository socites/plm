function CollectionCache(base, registry, entries) {
    "use strict";

    let key = (registry.cache) ? registry.cache.key : undefined;
    let id = (key) ? `collection.${key}.${base.id}` : undefined;
    let storage = module.cache.get(id);

    this.load = function () {

        if (!key) {
            // This collection do not support cache
            return;
        }

        let data = storage.data;

        if (data) {
            base.entries.set(data);
        }

        return !!data;

    };

    this.save = function () {

        if (!key) {
            // This collection do not support cache
            return;
        }

        if (!base.fetched) {
            return;
        }

        storage.data = entries.data.slice(registry.cache.max);

    };

}
