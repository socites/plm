/**
 * The Collections registry.
 * Each Collection registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When a Collection is being registered, the registry also register the Collections factory.
 * @constructor
 */
function CollectionsRegistry() {

    let registry = new Map();

    this.add = function (name, Collection, specs) {
        registry.set(Collection, new CollectionRegistry(name, Collection, specs));
    };

    this.get = function (name) {
        return registry.get(name);
    };

}
