function CollectionsAuthManager(factory) {
    "use strict";

    let auth = module.auth;

    auth.bind('change', function () {

        // Invalidate all collections when the accessToken changes
        factory.forEach(function (collection) {
            collection.clean();
        });

    });

}
