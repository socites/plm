function ItemBatchFetch(item, base) {
    "use strict";

    let promises = new Map();
    let list = [];

    let specs = base.fetch;
    if (!specs || !specs.module || !specs.path) {
        console.log('Item specs for fetching is not defined:', item);
        throw new Error('Item specs for fetching is not defined');
    }

    let max = 30;

    function fetch() {

        if (!list.length) {
            // No more items to fetch
            return;
        }

        let batch = list.splice(0, max);

        let params = {'ids': batch};

        let path = specs.path;
        let action = new specs.module.Action(path, params);

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

    this.fetch = function (base) {

        if (!item.id) {
            console.log('Item does not have its id:', item);
            throw new Error('Item does not have its id');
        }

        if (promises.has(item.id)) {
            return promises.get(item.id).promise;
        }

        list.push(item.id);
        let promise = new Promise(function (resolve, reject) {

            promises.set(item.id, {
                'item': item,
                'base': base,
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
