function Properties(object) {
    "use strict";

    let values = new Map();

    let expose = Delegate(this, function (specs) {

        let name = specs.name;
        let type = specs.type;

        function getValue() {

            let value = values.get(name);

            switch (type) {
                case 'boolean':
                    return !!value;
                default:
                    return value;
            }

        }

        try {

            Object.defineProperty(this, name, {
                'get': function () {
                    return getValue();
                },
                'set': function (value) {
                    values.set(name, value);
                }
            });
            Object.defineProperty(object, name, {
                'get': function () {
                    return getValue();
                }
            });

        }
        catch (exc) {
            console.error(`Error defining property "${name}"`);
            throw exc;
        }

    });

    this.define = function (list) {

        if (typeof list !== 'object') {
            throw new Error('Invalid parameters');
        }

        for (let property in list) {
            let specs = {'name': property, 'type': list[property]};
            expose(specs);
        }

    };

}
