function CollectionCounter(base, registry) {

    let value;
    Object.defineProperty(this, 'value', {
        'get': function () {
            return value;
        }
    });

    let loading, loaded;
    Object.defineProperty(this, 'loading', {
        'get': function () {
            return !!loading;
        }
    });
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    let promise;

    function onResponse(response) {

        promise = undefined;
        value = response;
        loading = false;
        loaded = true;

        base.events.trigger('change');

    }

    function onError(response) {

        promise = undefined;
        loading = false;
        base.events.trigger('change');

        throw new Error(response);

    }

    this.fetch = function (session, batcher) {

        if (loading) {
            return promise;
        }

        loading = true;
        base.events.trigger('change');

        if (batcher) {

            let id = base.attributes.get(batcher.key);

            promise = batcher.count(id, session);
            promise.then(onResponse)
                .catch(onError);

        } else {

            let params = base.attributes.values;

            let action = new registry.module.Action(registry.actions.count, params);
            action.onResponse = Delegate(onResponse, update);
            action.onError = onError;

            promise = action.execute({'promise': true}).promise;

        }

        return promise;

    };

}
