function CollectionClean(base, items, fetch, load) {
    "use strict";

    base.clean = function () {

        items.clean();

        fetch.fetched = false;
        fetch.fetching = false;
        load.loaded = false;

        base.events.trigger('change');

    };

}
