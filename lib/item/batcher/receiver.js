Batcher.prototype.data = function (id) {

    let requests = new Map();

    if (requests.has(id)) {
        return requests.get(id).promise;
    }

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
