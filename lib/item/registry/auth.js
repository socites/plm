function ItemsAuthManager(factory) {
    "use strict";

    let auth = module.auth;

    auth.bind('change', function () {

        // Invalidate all items when the accessToken changes

        factory.items.forEach(function (item, v) {

            // TODO: validate clean method
            if (item.hasOwnProperty('clean')) {
                item.clean();
            }

        });

    });

}
