function ItemFetchTU(base, data, registry) {
    "use strict";

    let batcher = registry.batcher;

    let promise;

    base.update = function () {

        if (promise) {
            return promise;
        }

        if (!base.id) {
            console.error('Item id must be set before calling the update method', base);
            throw new Error('Item id must be set before calling the update method');
        }

        promise = new Promise(function (resolve, reject) {

            batcher.tu(base.id)
                .then(function (response) {

                    base.updated.time = response;
                    base.events.trigger('change');
                    resolve();

                })
                .catch(function (response) {
                    console.log('error', response);
                    reject(base.error);

                });

        });

        return promise;

    };

}
