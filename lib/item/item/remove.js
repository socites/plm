function ItemRemove(base, registry) {

    let removing, removed;
    Object.defineProperty(base, 'removing', {
        'get': function () {
            return !!removing;
        }
    });
    Object.defineProperty(base, 'removed', {
        'get': function () {
            return !!removed;
        }
    });

    let promise;

    base.remove = function (specs, session) {

        if (promise) {
            return promise;
        }

        removing = true;
        base.events.trigger('change', base.instanceId);

        promise = new Promise(function (resolve, reject) {

            let path = registry.actions.remove;
            if (!path) {
                let message = 'Remove action not set for the current item:';
                console.error(message, base);
                throw new Error(message);
            }

            let params = (!!specs && specs instanceof Object) ? specs : {};

            // Set accessToken.
            if (!session) {
                throw new Error('Session not set');
            }
            if (!module.auth.sessions.has(session)) {
                throw new Error(`User is not logged in on session "${session}"`);
            }

            let s = module.auth.sessions.get(session);
            if (!s) {
                throw new Error(`User is not logged in on session "${session}"`);
            }

            params.accessToken = s.accessToken;

            // Execute action.
            let action = new registry.module.Action(path, params);
            action.onResponse = function (response) {

                promise = undefined;
                removing = false;
                removed = true;

                base.data.set(response);
                base.events.trigger('removed', base.instanceId);
                base.events.trigger('change', base.instanceId);
                resolve();

            };
            action.onError = function (response) {

                promise = undefined;
                removing = false;
                base.events.trigger('change', base.instanceId);
                reject(response);

            };

            promise = action.execute({'promise': true}).promise;

        });

        return promise;

    };

}
