function CollectionFetch(base, items, registry) {
    'use strict';

    let fetching, fetched;
    Object.defineProperty(this, 'fetching', {
        'get': () => !!fetching,
        'set': (value) => fetching = !!value
    });
    Object.defineProperty(base, 'fetching', {
        'get': () => !!fetching
    });
    Object.defineProperty(this, 'fetched', {
        'get': () => !!fetched,
        'set': (value) => fetched = !!value
    });
    Object.defineProperty(base, 'fetched', {
        'get': () => !!fetched
    });

    let pagesCount = 0;
    Object.defineProperty(base, 'pagesCount', {
        'get': () => pagesCount
    });

    let next;
    Object.defineProperty(this, 'next', {'get': () => next});

    let promise;

    function onResponse(update, response) {

        pagesCount = (update) ? 1 : pagesCount + 1;

        promise = undefined;
        base.error = undefined;
        fetching = false;
        fetched = true;

        if (typeof response === 'object') {

            if (pagesCount === 1) {
                items.set(response.records);
            }
            else {
                items.push(response.records);
            }

            next = response.next;

        }

        base.events.trigger('change', base.instanceId);

    }

    function onError(response) {

        promise = undefined;
        base.error = base.ERRORS.INVALID_RESPONSE;
        fetching = false;
        base.events.trigger('change', base.instanceId);

        throw new Error(response);

    }

    base.fetch = function (limit, session, update, batcher) {

        if (fetching) {
            return promise;
        }

        // There are no more pages to be fetched
        if (!update && pagesCount > 0 && !next) {
            return new Promise(resolve => resolve());
        }

        fetching = true;
        base.events.trigger('change', base.instanceId);

        if (batcher) {

            let id = base.attributes.get(batcher.key);

            if (!id || typeof id !== 'number' && typeof id !== 'string') {
                throw new Error(`Attribute "${batcher.key}" must be set to fetch the collection`);
            }

            promise = batcher.fetch(id, session);
            promise.then(Delegate(onResponse, update))
                .catch(onError);

        } else {

            let params = base.attributes.values;

            // Set the max number of records to be fetched
            params.limit = limit;

            if (!update && params.next) {
                params.next = next;
            }

            let action = new registry.module.Action(registry.actions.fetch, params);
            action.onResponse = Delegate(onResponse, update);
            action.onError = onError;

            promise = action.execute({'promise': true}).promise;

        }

        return promise;

    };

}
