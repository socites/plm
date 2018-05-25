define(function () {
    "use strict";

    let factories = new Factories();
    module.factories = factories;

    let registry = new Registry();
    module.registry = registry;

    return {
        'Collection': CollectionBase,
        'Item': ItemBase,
        'factories': factories,
        'registry': registry
    };

});
