function ItemData(base) {
    'use strict';

    let initialised;
    Object.defineProperty(this, 'initialised', {'get': () => !!initialised});

    let cache = base.cache;

    let fields = new Map();
    Object.defineProperty(this, 'fields', {'get': () => fields});

    this.set = function (values) {

        for (let name in values) {
            if (!values.hasOwnProperty(name)) continue;
            if (!fields.has(name)) continue;

            fields.get(name).published = values[name];
        }

        cache.save();

    };

    Object.defineProperty(this, 'unpublished', {
        'get': function () {

            let unpublished = {};
            fields.forEach(function (field) {
                if (field.unpublished) {
                    unpublished[field.name] = field.value;
                }
            });

            return unpublished;

        }
    });

    Object.defineProperty(this, 'isUnpublished', {
        'get': function () {
            for (let field of fields.values()) {
                if (field.unpublished) return true;
            }
            return false;
        }
    });

    this.discard = () => fields.forEach(field => field.discard());

    this.toJSON = function () {
        let output = {};
        fields.forEach(field => output[field.name] = field.published);
        return output;
    };

    this.initialise = function (specs) {

        if (initialised) {
            console.error('Data fields already initialised', this, base);
            throw new Error('Data fields already initialised');
        }

        initialised = true;

        for (let field of specs) {

            if (fields.has(field)) {
                console.warn(`Field ${field} already defined`);
                return;
            }

            fields.set(field, new DataField(base, this, field));

        }

    };

    this.update = function (field, value) {
        this[field] = value;
        base.events.trigger('change', base.instanceId);
    };

}
