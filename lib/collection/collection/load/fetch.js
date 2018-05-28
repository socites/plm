function CollectionFetch(base) {

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

            fetching = false;
            fetched = true;
            base.data = response;

        };
        action.onError = function (response) {

            fetching = false;
            console.log('error', response);

        };
        return action.execute({'promise': true});

    };

}
