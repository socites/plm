/**
 * Batch requests by a single key.
 *
 * @param registry
 * @param attributes {object} The attributes of the collection
 * @param limit
 * @param key {string} The key to batch the requests
 * @constructor
 */
function CollectionsBatcher(registry, attributes, key) {

    attributes = Object.assign({}, attributes);
    delete attributes[key];

    let list = [];

    let requests = new Map();
    Object.defineProperty(this, 'requests', {
        'get': function () {
            return requests;
        }
    });

    let max = 30;

    function fetch() {

        if (!list.length) {
            // No more items to fetch
            return;
        }

        let batch = list.splice(0, max);

        let params = Object.assign({}, attributes);
        params.limit = limit;
        params[key] = batch;

        let path = registry.actions.fetch;
        let action = new registry.module.Action(path, params);

        action.onResponse = function (response) {

            response = (response) ? response : {};

            for (let index = batch.length - 1; index >= 0; index--) {

                let id = batch[index];

                let promise = requests.get(id);

                batch.splice(batch.indexOf(id), 1);
                requests.delete(id);

                if (!response[id]) {
                    console.warn(`${registry.Collection.name} collection with attribute "${key}" "${id}" not found`);
                }

                promise.resolve(response[id]);

            }

            fetch();

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

        let promise;

        promise = new Promise(function (resolve, reject) {

            requests.set(id, {
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
