function CollectionClean(base, entries, fetch, load) {
    "use strict";

    base.clean = function () {

        entries.clean();

        fetch.fetched = false;
        fetch.fetching = false;
        load.loaded = false;

        base.events.trigger('change');

    };

}
