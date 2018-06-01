/**
 * The Items registry.
 * Each Item registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When an Item is being registered, the registry also register the Items factory.
 * @constructor
 */
function ItemsRegistry() {
    "use strict";

    let registry = new Map();

    this.add = function (Item, specs) {
        registry.set(Item, new ItemRegistry(Item, specs));
    };

    this.get = function (Item) {
        return registry.get(Item);
    };

}
