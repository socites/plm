function ItemCache(base, registry) {
    'use strict';

    let id, storage;
    Object.defineProperty(this, 'storageId', {'get': () => storage.id});

    function initialise() {

        if (!registry.cache) {
            return false;
        }

        if (storage) {
            // Already initialised.
            return true;
        }

        if (!base.id) {
            console.warn('Trying to save a not published item:', base);
            return false;
        }

        id = (registry.cache) ? `item.${registry.cache}.${base.id}` : undefined;
        storage = module.cache.get(id);

        return true;

    }

    this.load = function () {
        if (!initialise()) return;
        return storage.data;
    };

    this.save = function () {

        if (!base.fetched && !base.published) {
            // The cache saves the published values, if the item is not loaded
            // then there is nothing to save to cache
            return;
        }

        if (!initialise()) {
            console.log('not initialised');
            return;
        }

        let data = base.toJSON();
        if (!data) {
            console.warn('Item data is not set');
            return;
        }

        storage.data = data;

    };

    this.clean = function () {
        storage.clean();
    };

}
