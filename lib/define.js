define(function () {
    "use strict";

    let registries = {
        'items': new ItemsRegistry(),
        'collections': new CollectionsRegistry()
    };

    module.registries = registries;

    return {
        'Collection': Collection,
        'Item': Item,
        'Properties': Properties,
        'registries': registries
    };

});
