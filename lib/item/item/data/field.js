function DataField(base, name) {

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });

    let NOTSET = module.NOTSET;

    let memory = NOTSET;
    let published = NOTSET;

    function value() {

        if (memory !== NOTSET) {
            return memory;
        } else if (published !== NOTSET) {
            return published;
        }

    }

    Object.defineProperty(base, name, {
        'get': value,
        'set': function (value) {
            memory = value;
        }
    });

    Object.defineProperty(this, 'memory', {
        'get': function () {
            return memory;
        }
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
