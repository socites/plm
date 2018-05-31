function ItemData(base) {
    "use strict";

    let fields = new Map();

    this.define = function (values) {

        for (let field of values) {

            if (fields.has(field)) {
                console.warn(`Field ${field} already defined`);
                return;
            }

            fields.set(field, new DataField(base, name));

        }

    };

    this.set = function (values) {

        for (let name in values) {

            if (!fields.has(name)) {
                continue;
            }

            fields.get(name).published = values[name];

        }

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

    this.discard = function () {
        fields.forEach(field => field.discard());
    };

    this.toJSON = function () {
        let output = {};
        fields.forEach(field => output[field.name] = field.published);
        return output;
    };

}
