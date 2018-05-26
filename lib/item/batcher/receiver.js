Batcher.prototype.fetch = function (id) {

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
