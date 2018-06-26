/**
 * Batch requests by a single key.
 *
 * @param registry
 * @param attributes {object} The attributes of the collection
 * @param key {string} The key to batch the requests
 * @constructor
 */
function CollectionsBatcher(registry, attributes, key) {
    "use strict";

    let list = [];

    Object.defineProperty(this, 'key', {
        'get': function () {
            return key;
        }
    });

    let requests = {'count': new Map(), 'fetch': new Map()};

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

        if (!path) {
            console.error(`Collection "${registry.Collection.name}" does not implement action "${request}".`);
            return;
        }

        let action = new registry.module.Action(path, params);

        action.onResponse = function (response) {

            response = (response) ? response : {};

            for (let index = batch.length - 1; index >= 0; index--) {

                let id = batch[index];

                let promise = requests[request].get(id);

                batch.splice(batch.indexOf(id), 1);
                requests[request].delete(id);

                if (typeof response[id] === 'undefined') {
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
                let promise = requests[request].get(id);
                requests[request].delete(id);
                promise.reject(response);

            }

        };

        action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

    }

    let timer;

    function request(action, id, limit, session) {

        if (requests[action].has(id)) {
            return requests[action].get(id).promise;
        }

        list.push(id);

        let request = {};
        request.promise = new Promise(function (resolve, reject) {
            request.resolve = resolve;
            request.reject = reject;
        });

        requests[action].set(id, request);

        clearTimeout(timer);
        timer = setTimeout(function () {
            dispatch(action, limit);
        }, 0);

        return request.promise;

    }

    this.fetch = function (id, limit, session) {
        return request('fetch', id, limit, session);
    };

    this.count = function (id, session) {
        return request('count', id, undefined, session);
    };

}
