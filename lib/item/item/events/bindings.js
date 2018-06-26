function EventsBindings(base, events, supported) {
    "use strict";

    let bindings = new Map();

    supported.map(event => bindings.set(event, new EventBindings(base, events, event)));

    supported.map(event => Object.defineProperty(this, event, {
        'get': function () {
            return bindings.get(event);
        }
    }));

}
