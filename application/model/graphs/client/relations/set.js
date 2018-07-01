function RelationSet(relation, item) {

    let setting;
    Object.defineProperty(relation, 'setting', {
        'get': function () {
            return !!setting;
        }
    });

    let promise;

    relation.set = function (from, to) {

        if (setting) {
            return promise;
        }

        setting = true;
        item.triggerChange();

        promise = new Promise(function (resolve) {

            from = (from instanceof Graph) ? from.id : from;
            to = (to instanceof Graph) ? to.id : to;

            if (typeof from !== 'string' || typeof to !== 'string') {
                throw new Error('Invalid parameters');
            }

            let params = {'from': from, 'to': to};
            let action = new module.Action('/relations/find', params);
            action.onResponse = function (response) {

                promise = undefined;
                setting = false;
                item.set(response);

                resolve();

            };
            action.onError = function (response) {

                promise = undefined;
                setting = false;
                item.triggerChange();

                reject(response);

            };

            action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

        });

        return promise;

    };

}
