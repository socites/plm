function ItemsAuthManager(factory) {

    let auth = module.auth;

    auth.bind('change', function () {

        // Invalidate all items when the accessToken changes
        factory.forEach(function (item) {
            item.clean();
        });

    });

}
