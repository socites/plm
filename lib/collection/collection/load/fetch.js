function CollectionFetch(base, entries, registry) {
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

    let promise;

    base.fetch = function () {

        if (fetching) {
            return promise;
        }

        fetching = true;

        let params = base.attributes;
        if (registry.auth && module.auth.accessToken) {
            params.accessToken = module.auth.accessToken;
        }

        let action = new registry.module.Action(registry.actions.fetch, base.attributes);
        action.onResponse = function (response) {

            pagesCount++;

            base.error = undefined;
            fetching = false;
            fetched = true;
            entries.push(response);
            base.events.trigger('change');

        };
        action.onError = function (response) {

            base.error = base.ERRORS.INVALID_RESPONSE;
            fetching = false;
            base.events.trigger('change');

            reject(base.error);

        };

        promise = action.execute({'promise': true}).promise;
        return promise;

    };

}
