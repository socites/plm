function CollectionFetch(base) {

    base.fetch = function () {

        let params = (typeof base.fetch.params === 'function') ? base.fetch.params() : undefined;
        let action = new base.module.Action(base.fetch.action, params);
        action.onResponse = function (response) {

            base.data = response;

        };
        action.onError = function (response) {

            console.log('error', response);

        };
        return action.execute({'promise': true});

    };

}
