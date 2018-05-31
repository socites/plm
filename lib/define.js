define(function () {
    "use strict";

    let registries = {
        'items': new ItemsRegistry(),
        'collections': new CollectionsRegistry()
    };

    let auth = new AuthBridge();

    module.NOTSET = {};

    module.auth = auth;
    module.registries = registries;
    module.cache = new PLMCache();

    return {
        'auth': auth,
        'Collection': Collection,
        'Item': Item,
        'registries': registries
    };

});
