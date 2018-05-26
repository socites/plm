function Batcher(specs) {
    "use strict";

    let promises = new Map();
    let list = [];

    if (!specs || !specs.module || !specs.paths) {
        console.log('Item specs are not correctly defined:', specs);
        throw new Error('Item specs are not correctly defined');
    }

    let max = 30;

    function fetch() {

        if (!list.length) {
            // No more items to fetch
            return;
        }

        let batch = list.splice(0, max);

        let params = {'ids': batch};

        let paths = specs.paths;
        let action = new specs.module.Action(paths.fetch, params);

        function onError(error) {

            for (let index in batch) {

                let id = batch[index];
                let promise = promises.get(id);
                promises.delete(id);
                promise.reject(error);

            }

        }

        action.onResponse = function (response) {

            for (let index = batch.length - 1; index >= 0; index--) {

                let id = batch[index];

                let promise = promises.get(id);

                batch.splice(batch.indexOf(id), 1);
                promises.delete(id);
                promise.resolve(response[id]);

            }

            fetch();

        };

        action.onError = onError;

        action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

    }

    let timer;

    this.fetch = function (id) {

        if (promises.has(id)) {
            return promises.get(id).promise;
        }

        let promise;

        list.push(id);
        promise = new Promise(function (resolve, reject) {

            promises.set(id, {
                'promise': promise,
                'resolve': resolve,
                'reject': reject
            });

        });

        clearTimeout(timer);
        timer = setTimeout(fetch, 0);

        return promise;

    };

}
