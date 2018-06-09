/**
 * The Items registry.
 * Each Item registers its specifications, by instance, the specs.module, specs.paths (server path for fetching, etc.)
 * When an Item is being registered, the registry also register the Items factory.
 * @constructor
 */
function ItemsRegistry() {
    "use strict";

    let registry = new Map();

    this.register = function (Item, specs) {

        if (registry.has(Item)) {
            let message = 'Item is already registered';
            console.error(message, Item);
            throw new Error(message);
        }

        registry.set(Item, new ItemRegistry(Item, specs));

    };

    this.get = function (Item) {
        return registry.get(Item);
    };

    this.has = function (Item) {
        return registry.has(Item);
    };

}
