function ItemUpdater(base, registry) {
    'use strict';

    let batcher = registry.batcher;

    let time;
    Object.defineProperty(this, 'time', {
        'get': () => time,
        'set': (value) => time = value
    });

    Object.defineProperty(this, 'value', {
        'get': () => time === base.data.time_updated
    });

    let updating;
    Object.defineProperty(base, 'updating', {'get': () => !!updating});

    let promise;

    base.update = function (session) {

        // If item is being fetched, then the item is already being updated,
        // so return the promise of the fetch method.
        if (base.fetching) {
            return base.fetch();
        }

        // If the item is not loaded, then directly fetch the item data
        if (!base.loaded) {
            return base.fetch();
        }

        if (promise) {
            // The item is already being updated
            return promise;
        }

        if (!base.id) {
            console.error('Item id must be set before calling the updated.update method', base);
            throw new Error('Item id must be set before calling the updated.update method');
        }

        updating = true;
        base.events.trigger('change', base.instanceId);

        promise = new Promise(function (resolve, reject) {

            batcher.tu(base.id, session)
                .then(function (response) {

                    promise = undefined;
                    time = response;
                    updating = false;
                    base.events.trigger('change', base.instanceId);

                    if (time !== base.data.time_updated) {
                        return base.fetch();
                    }
                    else {
                        resolve();
                    }

                })
                .then(function () {
                    resolve()
                })
                .catch(function (error) {

                    promise = undefined;
                    updating = false;
                    base.events.trigger('change', base.instanceId);
                    console.error('Error updating item', error, base);
                    reject(error);

                });

        });

        return promise;

    };

}
