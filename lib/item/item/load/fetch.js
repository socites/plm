function ItemFetch(base, registry) {
    "use strict";

    let batcher = registry.batcher;

    let fetching, fetched;
    Object.defineProperty(base, 'fetching', {
        'get': function () {
            return !!fetching;
        }
    });
    Object.defineProperty(base, 'fetched', {
        'get': function () {
            return !!fetched;
        }
    });

    let promise;

    function onResponse(resolve, reject, response) {

        promise = undefined;
        base.error = undefined;
        fetching = false;
        fetched = true;

        try {
            base.data.set(response);
        }
        catch (exc) {

            console.log(exc.stack);
            base.error = base.ERRORS.INVALID_RESPONSE;
            base.events.trigger('change', base.instanceId);

            reject(base.error);
            return;

        }

        base.events.trigger('change', base.instanceId);
        base.events.trigger('updated');

        resolve(response);

    }

    function onError(reject, response) {

        promise = undefined;
        console.log('error', response);
        base.error = base.ERRORS.INVALID_RESPONSE;
        fetching = false;
        base.events.trigger('change', base.instanceId);

        reject(base.error);

    }

    base.fetch = function (session) {

        if (promise) {
            return promise;
        }

        fetching = true;
        base.events.trigger('change', base.instanceId);

        if (!base.id) {
            console.error('Item id must be set before calling the fetch method', base);
            throw new Error('Item id must be set before calling the fetch method');
        }

        promise = new Promise(function (resolve, reject) {

            batcher.data(base.id, session)
                .then(Delegate(onResponse, resolve, reject))
                .catch(Delegate(onError, reject));

        });

        return promise;

    };

}
