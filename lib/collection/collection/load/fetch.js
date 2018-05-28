function CollectionFetch(base, registry) {

    let fetching, fetched;
    Object.defineProperty(this, 'fetching', {
        'get': function () {
            return !!fetching;
        }
    });
    Object.defineProperty(this, 'fetched', {
        'get': function () {
            return !!fetched;
        }
    });

    let promise;

    base.fetch = function () {

        if (fetching) {
            return promise;
        }

        fetching = true;

        let params = (typeof base.fetch.params === 'function') ? base.fetch.params() : undefined;
        let action = new base.module.Action(base.fetch.action, params);
        action.onResponse = function (response) {

            base.error = undefined;
            fetching = false;
            fetched = true;
            base.data = response;
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
