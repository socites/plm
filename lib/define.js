define(function () {
    "use strict";

    let registries = {
        'items': new ItemsRegistry(),
        'collections': new CollectionsRegistry()
    };

    let auth = new AuthBridge();

    module.auth = auth;
    module.registries = registries;

    return {
        'auth': auth,
        'Collection': Collection,
        'Item': Item,
        'Properties': Properties,
        'registries': registries
    };

});
