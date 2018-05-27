/**
 * The Items registry.
 * Each Item registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When an Item is being registered, the registry also register the Items factory.
 * @constructor
 */
function ItemsRegistry() {

    let registry = new Map();
    let factory = new ItemsFactory();

    this.add = function (name, Item, specs) {
        factory.register(name);
        registry.set(Item, new ItemRegistry(name, Item, specs));
    };

    this.get = function (name) {
        return registry.get(name);
    };

}
