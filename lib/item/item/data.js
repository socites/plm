function ItemData(base) {

    let data = {}, values = {};
    Object.defineProperty(base, 'data', {
        'get': function () {
            return data;
        }
    });

    let fields = new Map();

    function expose(field) {

        if (fields.has(field)) {
            return;
        }

        Object.defineProperty(data, field, {
            'get': function () {
                return values[field];
            }
        });

    }

    this.set = function (fields) {

        for (let field in fields) {

            if (field === 'id') continue;

            values[field] = fields[field];
            expose(field);

        }

    };

}
