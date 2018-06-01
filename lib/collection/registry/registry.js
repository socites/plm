/**
 * The Collections registry.
 * Each Collection registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When a Collection is being registered, the registry also register the Collections factory.
 * @constructor
 */
function CollectionsRegistry() {
    "use strict";

    let registry = new Map();

    this.add = function (Collection, Item, specs) {
        registry.set(Collection, new CollectionRegistry(Collection, Item, specs));
    };

    this.get = function (Collection) {
        return registry.get(Collection);
    };

}
