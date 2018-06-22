function CollectionCache(base, registry, entries) {
    "use strict";

    let key = (registry.cache) ? registry.cache.key : undefined;
    let id = (key) ? `collection.${key}.${base.attributes.key.value}` : undefined;
    let storage = module.cache.get(id);

    this.load = function () {

        if (!key) {
            // This collection do not support cache
            return;
        }

        let data = storage.data;

        if (data) {
            entries.set(data);
        }

        return !!data;

    };

    let saved;
    Object.defineProperty(this, 'saved', {
        'get': function () {
            return !!saved;
        }
    });

    this.save = function () {

        if (!key) {
            // This collection do not support cache
            return;
        }

        if (saved) {
            // The collection is already saved
            return;
        }

        if (!base.fetched) {
            return;
        }

        // The collection is saved once it achieved the max items expected by configuration
        saved = (entries.data.length >= registry.cache.max);
        storage.data = entries.data.slice(0, registry.cache.max);

    };

}
