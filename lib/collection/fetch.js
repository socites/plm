function CollectionFetch(collection, base) {

    collection.fetch = function () {

        let action = new base.module.Action(base.fetch.action, base.fetch.params());
        action.onResponse = function (response) {

            base.data = response;

        };
        action.onError = function (response) {

            console.log('error', response);

        };
        action.execute();

    };

}
