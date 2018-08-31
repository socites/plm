function CollectionCounter(base, registry) {

    let value;
    Object.defineProperty(this, 'value', {'get': () => value});

    let loading, loaded;
    Object.defineProperty(this, 'loading', {'get': () => !!loading});
    Object.defineProperty(this, 'loaded', {'get': () => !!loaded});

    let promise;

    function onResponse(response) {

        promise = undefined;
        value = response;
        loading = false;
        loaded = true;

        base.events.trigger('change', base.instanceId);

    }

    function onError(response) {

        promise = undefined;
        loading = false;
        base.events.trigger('change', base.instanceId);

        throw new Error(response);

    }

    this.fetch = function (session, batcher) {

        if (loading) {
            return promise;
        }

        loading = true;
        base.events.trigger('change', base.instanceId);

        if (batcher) {

            let id = base.attributes.get(batcher.key);

            if (!id || typeof id !== 'number' && typeof id !== 'string') {
                throw new Error(`Attribute "${batcher.key}" must be set to fetch the collection`);
            }

            promise = batcher.count(id, session);
            promise.then(onResponse)
                .catch(onError);

        } else {

            let params = base.attributes.values;

            if (!registry.actions.count) {
                console.error(`Collection "${registry.Collection.name}" does not implement action "count".`);
                return;
            }

            let action = new registry.module.Action(registry.actions.count, params);
            action.onResponse = onResponse;
            action.onError = onError;

            promise = action.execute({'promise': true}).promise;

        }

        return promise;

    };

}
