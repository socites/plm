function Batcher(registry) {
    "use strict";

    let data = new Dispatcher(registry);
    let tu = new Dispatcher(registry, 'timeUpdated');

    this.data = function (id) {
        return data.dispatch(id);
    };

    this.tu = function (id) {
        return tu.dispatch(id);
    };

}
