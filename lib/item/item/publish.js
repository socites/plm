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

    base.publish = function (specs) {

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

            //TODO: validate if condition
            //if (!module.auth.accessToken) {
            if (!registry.auth || !module.auth.accessToken) {
                throw new Error('Authentication not set, or user not logged in');
            }

            let params = (!!specs && specs instanceof Object) ? specs : {};
            params.accessToken = module.auth.accessToken;

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
