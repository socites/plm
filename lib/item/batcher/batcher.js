function Batcher(registry) {
    "use strict";

    let data = new Dispatcher(registry);
    let tu = new Dispatcher(registry, 'timeUpdated');

    this.data = function (id, session) {
        return data.dispatch(id, session);
    };

    this.tu = function (id, session) {
        return tu.dispatch(id, session);
    };

}
