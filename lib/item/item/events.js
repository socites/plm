function ItemEvents(item, base) {
    "use strict";

    let events = new Events();

    let supported = ['change', 'published', 'destroyed'];

    let triggers = {};
    supported.map(event => triggers[event] = function () {
        events.trigger(event);
    });

    let bindings = {};

    function update() {

        supported.map(function (event) {

            if (typeof bindings[event] === 'undefined') {
                return;
            }

            if (bindings[event]) {
                base.events.bind(event, triggers[event]);
            }
            else {
                base.events.unbind(event, triggers[event]);
            }

        });

    }

    item.bind = function (event) {

        if (supported.indexOf(event) === -1) {
            throw new Error(`Event "${event}" is not supported`);
        }

        bindings[event] = (bindings[event]) ? bindings[event] : 0;
        bindings[event]++;

        update();

        return events.bind.call(events, ...arguments);

    };
    item.unbind = function (event) {

        if (supported.indexOf(event) === -1) {
            throw new Error(`Event "${event}" is not supported`);
        }

        bindings[event] = (bindings[event]) ? bindings[event] - 1 : 0;
        update();

        return events.unbind.call(events, ...arguments);

    };

}
