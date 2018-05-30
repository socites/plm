function Batcher(registry) {
    "use strict";

    let fetch = new Dispatcher(registry);
    let tu = new Dispatcher(registry, 'timeUpdated');

    this.fetch = function (id) {
        return fetch.dispatch(id);
    };

    this.tu = function (id) {
        return tu.dispatch(id);
    };

}
