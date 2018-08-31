function ItemEvents(item, proxy, base, maps) {

    let events = new Events();

    let supported = ['change', 'published', 'destroyed', 'removed'];

    // Events bound to the base object
    let bindings = new EventsBindings(base, events, supported);
    Object.defineProperty(this, 'bindings', {'get': () => bindings});

    proxy.triggerChange = () => base.events.trigger('change', base.instanceId);

    item.bind = function (event) {

        let args = [].slice.call(arguments);
        args.shift();

        // The following events are bound directly to the item itself, not to the base object.
        if (['loaded', 'updated'].indexOf(event) !== -1) {
            return base.events.bind('loaded', ...args);
        }

        if (supported.indexOf(event) === -1) {
            throw new Error(`Event "${event}" is not supported`);
        }

        bindings[event].bind.call(bindings[event], ...args);

    };

    item.unbind = function (event) {

        let args = [].slice.call(arguments);
        args.shift();

        // The following events are bound directly to the item itself, not to the base object.
        if (['loaded', 'updated'].indexOf(event) !== -1) {
            return base.events.unbind('loaded', ...args);
        }

        if (supported.indexOf(event) === -1) {
            throw new Error(`Event "${event}" is not supported`);
        }

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
