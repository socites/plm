define(function () {

    let registries = new Registries();

    let auth = new AuthBridge();

    module.NOTSET = {};

    module.auth = auth;
    module.registries = registries;
    module.cache = new PLMCache();

    return {
        'auth': auth,
        'Collection': CollectionProxy,
        'Item': ItemProxy,
        'registries': registries
    };

});
