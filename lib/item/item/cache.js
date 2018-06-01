function ItemCache(base, registry) {
    "use strict";

    let id = (registry.cache) ? `item.${registry.cache}.${base.id}` : undefined;
    let storage = module.cache.get(id);

    this.load = function () {

        let data = storage.data;

        if (data) {
            base.set(data)
        }

    };

    this.save = function () {
        storage.data = JSON.stringify(base);
    };

}
