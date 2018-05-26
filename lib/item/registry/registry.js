/**
 * The Items registry.
 * Each Item registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When an Item is being registered, the registry also register the Item factory.
 * @constructor
 */
function Registry() {

    let registry = new Map();
    let factory = module.factory;

    this.add = function (name, Item, specs) {
        factory.register(name);
        registry.set(Item, new RegistryItem(name, Item, specs));
    };

    this.get = function (Item) {
        return registry.get(Item);
    };

}
