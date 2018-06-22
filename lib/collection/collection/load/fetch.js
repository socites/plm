function CollectionFetch(base, items, registry) {
    "use strict";

    let fetching, fetched;
    Object.defineProperty(this, 'fetching', {
        'get': function () {
            return !!fetching;
        },
        'set': function (value) {
            fetching = !!value;
        }
    });
    Object.defineProperty(base, 'fetching', {
        'get': function () {
            return !!fetching;
        }
    });
    Object.defineProperty(this, 'fetched', {
        'get': function () {
            return !!fetched;
        },
        'set': function (value) {
            fetched = !!value;
        }
    });
    Object.defineProperty(base, 'fetched', {
        'get': function () {
            return !!fetched;
        }
    });

    let pagesCount = 0;
    Object.defineProperty(base, 'pagesCount', {
        'get': function () {
            return pagesCount;
        }
    });

    let next;

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

        base.events.trigger('change');

    }

    function onError() {

        promise = undefined;
        base.error = base.ERRORS.INVALID_RESPONSE;
        fetching = false;
        base.events.trigger('change');

        reject(base.error);

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
        base.events.trigger('change');

        if (batcher) {

            let id = base.attributes.get(batcher.key);

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
