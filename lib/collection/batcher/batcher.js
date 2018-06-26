/**
 * Batch requests by a single key.
 *
 * @param registry
 * @param attributes {object} The attributes of the collection
 * @param key {string} The key to batch the requests
 * @constructor
 */
function CollectionsBatcher(registry, attributes, key) {

    let list = [];

    Object.defineProperty(this, 'key', {
        'get': function () {
            return key;
        }
    });

    let requests = {'counters': new Map(), 'fetch': new Map()};
    Object.defineProperty(this, 'requests', {
        'get': function () {
            return requests;
        }
    });

    let max = 30;

    /**
     * Dispatch fetch or count.
     *
     * @param request {string} The request to be executed (fetch or count).
     * @param limit {number} Only if path is 'fetch', the limit of items to be fetched.
     */
    function dispatch(request, limit) {

        if (!list.length) {
            // No more items to fetch
            return;
        }

        let batch = list.splice(0, max);

        let params = Object.assign({}, attributes.values);
        params[key] = batch;

        if (request === 'fetch') {
            params.limit = limit;
        }

        let path = registry.actions[request];
        let action = new registry.module.Action(path, params);

        action.onResponse = function (response) {

            response = (response) ? response : {};

            for (let index = batch.length - 1; index >= 0; index--) {

                let id = batch[index];

                let promise = requests.get(id);

                batch.splice(batch.indexOf(id), 1);
                requests.delete(id);

                if (!response[id]) {
                    let message = `${registry.Collection.name} collection with attribute "${key}" "${id}" not found`;
                    console.warn(message, response);
                }

                promise.resolve(response[id]);

            }

            dispatch(request, limit);

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
    this.fetch = function (id, session) {

        if (requests.has(id)) {
            return requests.get(id).promise;
        }

        list.push(id);

        let request = {};
        request.promise = new Promise(function (resolve, reject) {
            request.resolve = resolve;
            request.reject = reject;
        });

        requests.set(id, request);

        clearTimeout(timer);
        timer = setTimeout(fetch, 0);

        return request.promise;

    };

}