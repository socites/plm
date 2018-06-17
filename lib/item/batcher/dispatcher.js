function Dispatcher(registry, data) {
    "use strict";

    let list = [];

    let requests = new Map();
    Object.defineProperty(this, 'requests', {
        'get': function () {
            return requests;
        }
    });

    let max = 30;

    function dispatch() {

        if (!list.length) {
            // No more items to fetch
            return;
        }

        let batch = list.splice(0, max);

        let params = {'ids': batch, 'data': data};

        let path = registry.actions[(data === 'timeUpdated') ? 'tu' : 'data'];
        let action = new registry.module.Action(path, params);

        action.onResponse = function (response) {

            response = (response) ? response : {};

            for (let index = batch.length - 1; index >= 0; index--) {

                let id = batch[index];

                let promise = requests.get(id);

                batch.splice(batch.indexOf(id), 1);
                requests.delete(id);

                if (!response[id]) {
                    console.warn(`${registry.Item.name} with id "${id}" not found`);
                }

                promise.resolve(response[id]);

            }

            dispatch();

        };

        action.onError = function (response) {

            for (let index in batch) {

                let id = batch[index];
                let promise = requests.get(id);
                requests.delete(id);
                promise.reject(response);

            }

        };

        action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

    }

    let timer;
    this.dispatch = function (id, session) {

        if (requests.has(id)) {
            return requests.get(id).promise;
        }

        list.push(id);

        let promise;

        promise = new Promise(function (resolve, reject) {

            requests.set(id, {
                'promise': promise,
                'resolve': resolve,
                'reject': reject
            });

        });

        clearTimeout(timer);
        timer = setTimeout(dispatch, 0);

        return promise;

    };

}
