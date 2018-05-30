function FieldsValues() {
    "use strict";

    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            let output = {};
            for (let name in values) {
                output[name] = values[name];
            }
            return output;
        }
    });

    let fields = [];
    Object.defineProperty(this, 'fields', {
        'get': function () {
            return fields;
        }
    });

    this.define = function (define) {

        for (let i in define) {

            (Delegate(this, function (field) {

                this.fields.push(field.name);
                values[field.name] = undefined;

                // Just the 'set', no 'get'
                // the values are later accessed through the 'values' field
                Object.defineProperty(this, field.name, {
                    'set': function (value) {
                        value = (field.type === 'graph' && value) ? value.id : value;
                        values[field.name] = value;
                    }
                });

            }))(define[i]);

        }

    };

    // Count how much values are assigned
    Object.defineProperty(this, 'count', {
        'get': function () {
            let count = 0;
            for (let i in values) {
                if (values[i] !== undefined) count++;
            }

            return count;
        }
    });

}
