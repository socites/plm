function EventBindings(base, events, event) {

    let length = 0;
    Object.defineProperty(this, 'length', {
        'get': function () {
            return length;
        }
    });

    function trigger() {
        return events.trigger.call(events, event, ...arguments);
    }

    this.trigger = trigger;

    this.bind = function () {

        length++;
        if (length === 1) {

            base.events.bind(event, trigger);

            if (this.onBound === 'function') {
                this.onBound();
            }

        }

        events.bind.call(events, event, ...arguments);

    };

    this.unbind = function () {

        length--;
        if (length === 0) {

            base.events.unbind(event, trigger);

            if (this.onUnbound === 'function') {
                this.onUnbound();
            }

        }

    };

}