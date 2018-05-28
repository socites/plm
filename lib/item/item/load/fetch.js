function ItemFetch(base, registry) {

    let batcher = registry.batcher;

    let fetching, fetched;
    Object.defineProperty(this, 'fetching', {
        'get': function () {
            return !!fetching;
        }
    });
    Object.defineProperty(this, 'fetched', {
        'get': function () {
            return !!fetched;
        }
    });

    let promise;

    this.fetch = function () {

        if (typeof base.set !== 'function') {
            console.error('Item does not implement update function', item);
            throw new Error('Item does not implement update function');
        }

        if (promise) {
            return promise;
        }

        fetching = true;
        base.events.trigger('change');

        if (!base.id) {
            throw new Error('Item id must be set before calling the fetch method');
        }

        promise = new Promise(function (resolve, reject) {

            batcher.fetch(base.id)
                .then(function (response) {

                    if (!response) {
                        resolve();
                        base.events.trigger('change');
                        return;
                    }

                    base.error = undefined;
                    fetching = false;
                    fetched = true;

                    try {
                        base.set(response);
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
                .catch(function () {

                    base.error = base.ERRORS.INVALID_RESPONSE;
                    fetching = false;
                    base.events.trigger('change');

                    reject(base.error);

                });

        });

        return promise;

    };

}
