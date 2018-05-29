function ItemUpdated(base, registry) {

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
    Object.defineProperty('base', 'updated', {
        'get': function () {
            return time;
        }
    });

    Object.defineProperty(this, 'value', {
        'get': function () {
            return time === base.data.time_updated;
        }
    });

    let promise;

    this.update = function () {

        if (promise) {
            return promise;
        }

        if (!base.id) {
            console.error('Item id must be set before calling the updated.update method', base);
            throw new Error('Item id must be set before calling the updated.update method');
        }

        promise = new Promise(function (resolve, reject) {

            batcher.tu(base.id)
                .then(function (response) {
                    time = response;
                })
                .catch(function () {
                    console.error('Error updating time_updated', base);
                });

        });

        return promise;

    };

}
