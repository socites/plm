function ItemCache(base, registry) {
    "use strict";

    let id = (registry.cache) ? `item.${registry.cache}.${base.id}` : undefined;
    let storage = module.cache.get(id);

    this.load = function () {

        let data = storage.data;

        if (data) {
            base.data.set(data);
        }

        return !!data;

    };

    this.save = function () {
        storage.data = base.toJSON();
    };

}
