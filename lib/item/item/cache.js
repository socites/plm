function ItemCache(base, registry) {
    "use strict";

    let id = (registry.cache) ? `item.${registry.cache}.${base.id}` : undefined;
    let storage = module.cache.get(id);

}
