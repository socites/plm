function ItemData(base) {
    "use strict";

    let fields = new Map();

    this.set = function (values) {

        for (let name in values) {

            if (name === 'id') {
                continue;
            }

            let value = values[name];

            let field;
            if (!fields.has(name)) {
                fields.get(name);
            } else {
                field = new DataField(name);
            }

            field.published = value;

        }

    };

}
