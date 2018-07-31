function ItemRemove(base, registry) {

    let removing;
    Object.defineProperty(base, 'removing', {'get': () => !!removing});

    let promise;

    base.remove = function (session) {

        if (promise) {
            throw new Error('Item is already being removed');
        }

        if (!base.id) {
            throw new Error('Item is not persisted and cannot be removed');
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

            let params = {'id': base.id};

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
