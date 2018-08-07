function DataField(base, data, name) {
    'use strict';

    Object.defineProperty(this, 'name', {'get': () => name});

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

    Object.defineProperty(this, 'memory', {'get': () => memory});

    Object.defineProperty(this, 'value', {'get': value});

    Object.defineProperty(this, 'published', {
        'get': () => published,
        'set': (value) => published = value
    });

    Object.defineProperty(this, 'unpublished', {
        'get': () => (memory !== NOTSET && memory !== published)
    });

    this.discard = () => memory = NOTSET;

}
