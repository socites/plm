function RelationSet(relation, item) {

    let searching, searched;
    Object.defineProperty(relation, 'searching', {
        'get': function () {
            return !!searching;
        }
    });
    Object.defineProperty(relation, 'searched', {
        'get': function () {
            return !!searched;
        }
    });

    let promise;

    function set(from, to) {

        if (relation.id) {
            throw new Error('Item already set');
        }

        if (searching) {
            return promise;
        }

        searching = true;
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
                searching = false;
                searched = true;

                if (response) {
                    item.set(response);
                }

                resolve();

            };
            action.onError = function (response) {

                promise = undefined;
                searching = false;
                item.triggerChange();

                reject(response);

            };

            action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

        });

        return promise;

    }

    relation.set = function (from, to) {

        return new Promise(function (resolve) {

            let metamodel = module.metamodel;
            metamodel.load()
                .then(function () {
                    return set(from, to);
                })
                .then(resolve);

        });

    };

}
