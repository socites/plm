function Controller(change, dependencies, properties, specs) {
    "use strict";

    var user;
    Object.defineProperty(this, 'user', {
        'get': function () {
            return user;
        }
    });

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return !!user;
        }
    });

    this.update = function () {

        if (user && properties.userId === user.id) {
            return user;
        }

        if (user) {
            user.unbind('change', change);
        }

        if (!properties.userId) {
            user = undefined;
        }
        else {
            user = new dependencies.User(properties.userId);
            user.bind('change', change);
        }

        return user;

    };

}
