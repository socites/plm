define(function () {
    "use strict";

    let registries = new Registries();

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
