/**
 * The Collections registry.
 * Each Collection registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When a Collection is being registered, the registry also register the Collections factory.
 * @constructor
 */
function CollectionsRegistry() {
    "use strict";

    let registry = new Map();

    this.register = function (Collection, Item, specs) {

        if (registry.has(Collection)) {
            let message = 'Collection is already registered';
            console.error(message, Collection);
            throw new Error(message);
        }

        registry.set(Collection, new CollectionRegistry(Collection, Item, specs));

    };

    this.get = function (Collection) {
        return registry.get(Collection);
    };

}
