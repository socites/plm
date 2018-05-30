function ItemUpdater(base, registry) {

    let batcher = registry.batcher;

    let time;
    Object.defineProperty(this, 'time', {
        'get': function () {
            return time;
        },
        'set': function (value) {
            time = value;
        }
    });

    Object.defineProperty(this, 'value', {
        'get': function () {
            return time === base.data.time_updated;
        }
    });

    let updating;
    Object.defineProperty(base, 'updating', {
        'get': function () {
            return !!updating;
        }
    });

    let promise;

    base.update = function () {

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
        base.events.trigger('change');

        promise = new Promise(function (resolve, reject) {

            batcher.tu(base.id)
                .then(function (response) {

                    time = response;
                    updating = false;
                    base.events.trigger('change');

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
                    updating = false;
                    base.events.trigger('change');
                    console.error('Error updating item', base);
                    reject(error);
                });

        });

        return promise;

    };

}
