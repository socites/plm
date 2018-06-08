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

    base.fetch = function (limit, update) {

        if (fetching) {
            return promise;
        }

        // There are no more pages to be fetched
        if (!update && pagesCount > 0 && !next) {
            return new Promise(resolve => resolve());
        }

        fetching = true;
        base.events.trigger('change');

        let params = base.attributes;
        if (registry.auth && module.auth.accessToken) {
            params.accessToken = module.auth.accessToken;
        }

        // Set the max number of records to be fetched
        params.limit = limit;

        if (!update && params.next) {
            params.next = next;
        }

        let action = new registry.module.Action(registry.actions.fetch, base.attributes);
        action.onResponse = function (response) {

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

        };
        action.onError = function (response) {

            promise = undefined;
            base.error = base.ERRORS.INVALID_RESPONSE;
            fetching = false;
            base.events.trigger('change');

            reject(base.error);

        };

        promise = action.execute({'promise': true}).promise;
        return promise;

    };

}
