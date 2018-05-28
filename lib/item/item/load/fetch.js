function ItemFetch(item, base) {

    let registry = module.registry.get(item.constructor);
    if (!registry) {
        console.error('Item is not registered for the required instance:', item);
        throw new Error('Item is not registered for the required instance');
    }

    let batcher = registry.batcher;

    let props = base.properties;

    let promise;
    this.fetch = function () {

        if (typeof base.set !== 'function') {
            console.error('Item does not implement update function', item);
            throw new Error('Item does not implement update function');
        }

        if (promise) {
            return promise;
        }

        props.fetching = true;
        base.events.trigger('change');

        if (!props.id) {
            throw new Error('Item id must be set before calling the fetch method');
        }

        promise = new Promise(function (resolve, reject) {

            batcher.fetch(props.id)
                .then(function (response) {

                    props.fetching = false;

                    if (!response) {
                        resolve();
                        base.events.trigger('change');
                        return;
                    }

                    props.fetched = true;
                    props.loaded = true;

                    try {
                        base.set(response);
                        base.events.trigger('change');
                        resolve();
                    }
                    catch (exc) {
                        console.log(exc.stack);
                        reject(props.ERRORS.INVALID_RESPONSE);
                    }

                })
                .catch(function (error) {

                    props.fetching = false;
                    base.events.trigger('change');
                    reject(error);

                });

        });

        return promise;

    };

}
