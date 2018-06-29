function ItemEvents(item, proxy, base, maps) {
    "use strict";

    let events = new Events();

    let supported = ['change', 'published', 'destroyed'];

    let bindings = new EventsBindings(base, events, supported);
    Object.defineProperty(this, 'bindings', {
        'get': function () {
            return bindings;
        }
    });

    proxy.triggerChange = function () {
        base.events.trigger('change', base.instanceId);
    };

    item.bind = function (event) {

        if (supported.indexOf(event) === -1) {
            throw new Error(`Event "${event}" is not supported`);
        }

        let args = [].slice.call(arguments);
        args.shift();

        bindings[event].bind.call(bindings[event], ...args);

    };

    item.unbind = function (event) {

        if (supported.indexOf(event) === -1) {
            throw new Error(`Event "${event}" is not supported`);
        }

        let args = [].slice.call(arguments);
        args.shift();

        bindings[event].bind.call(bindings[event], ...args);

    };

    bindings.change.onBound = function () {
        base.bind('updated', maps.update);
        maps.active = true;
    };

    bindings.change.onUnbound = function () {
        base.unbind('updated', maps.update);
        maps.active = false;
    };

}
