function ItemPublish(base, registry) {

    let publishing;
    Object.defineProperty(base, 'publishing', {
        'get': function () {
            return !!publishing;
        }
    });

    let published;
    Object.defineProperty(base, 'published', {
        'get': function () {
            return !!published;
        }
    });

    let promise;

    base.publish = function (specs, session) {

        if (promise) {
            return promise;
        }

        publishing = true;
        base.events.trigger('change');

        promise = new Promise(function (resolve, reject) {

            let path = registry.actions.publish;
            if (!path) {
                console.error('Publish action not set for the current item:', base);
                throw new Error('Publish action not set for the current item');
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

                if (!base.id) {

                    if (!response.id) {
                        console.error('Item id was not received when publishing new item:', response);
                        throw new Error('Item id was not received');
                    }

                    published = true;
                    base.id = response.id;

                }

                promise = undefined;
                publishing = false;

                base.data.set(response);
                base.events.trigger('published');
                base.events.trigger('change');
                resolve();

            };
            action.onError = function (response) {

                promise = undefined;
                publishing = false;
                base.events.trigger('change');
                reject(response);

            };

            promise = action.execute({'promise': true}).promise;

        });

        return promise;

    };

}
