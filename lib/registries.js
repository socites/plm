function Registries() {
    "use strict";

    let items = new ItemsRegistry();
    Object.defineProperty(this, 'items', {
        'get': function () {
            return items;
        }
    });

    let collections = new CollectionsRegistry();
    Object.defineProperty(this, 'collections', {
        'get': function () {
            return collections;
        }
    });

}
