function DataField(base, data, name) {
    "use strict";

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

    let NOTSET = module.NOTSET;

    let memory = NOTSET;
    let published;

    function value() {

        if (memory !== NOTSET) {
            return memory;
        }

        return published;

    }

    function setValue(value) {

        if (base.publishing) {

            console.warn('Cannot change properties while publishing item');

            // If the UI is trying to change the field, then update the UI to show the user
            // that the field did not change
            base.events.trigger('change', base.instanceId);
            return;

        }

        memory = value;

    }

    Object.defineProperty(data, name, {
        'get': value,
        'set': setValue
    });

    Object.defineProperty(base, name, {
        'get': value,
        'set': setValue
    });

    Object.defineProperty(this, 'memory', {
        'get': function () {
            return memory;
        }
    });

    Object.defineProperty(this, 'value', {
        'get': value
    });

    Object.defineProperty(this, 'published', {
        'get': function () {
            return published;
        },
        'set': function (value) {
            published = value;
        }
    });

    Object.defineProperty(this, 'unpublished', {
        'get': function () {
            return (memory !== NOTSET && memory !== published);
        }
    });

    this.discard = function () {
        memory = NOTSET;
    };

}
