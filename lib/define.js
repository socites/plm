define(function () {
    "use strict";

    let factory = new Factory();
    module.factory = factory;

    let registry = new Registry();
    module.registry = registry;

    return {
        'Collection': CollectionBase,
        'Item': ItemBase,
        'factory': factory,
        'registry': registry
    };

});
