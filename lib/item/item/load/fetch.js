function ItemFetch(base, data, registry) {
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

    base.fetch = function () {

        if (promise) {
            return promise;
        }

        fetching = true;
        base.events.trigger('change');

        if (!base.id) {
            console.error('Item id must be set before calling the fetch method', base);
            throw new Error('Item id must be set before calling the fetch method');
        }

        promise = new Promise(function (resolve, reject) {

            batcher.data(base.id)
                .then(function (response) {

                    promise = undefined;
                    base.error = undefined;
                    fetching = false;
                    fetched = true;

                    try {
                        data.set(response);
                        base.events.trigger('change');
                        resolve();
                    }
                    catch (exc) {

                        console.log(exc.stack);
                        base.error = base.ERRORS.INVALID_RESPONSE;
                        fetching = false;
                        base.events.trigger('change');

                        reject(base.error);

                    }

                })
                .catch(function (response) {

                    promise = undefined;
                    console.log('error', response);
                    base.error = base.ERRORS.INVALID_RESPONSE;
                    fetching = false;
                    base.events.trigger('change');

                    reject(base.error);

                });

        });

        return promise;

    };

}
