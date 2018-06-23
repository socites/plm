function ItemGetters(base) {

    let lastUpdatedTime;
    let values;

    function update() {

        values = {};

        function expose(property, value) {
            Object.defineProperty(values, property, {
                'get': function () {
                    return value;
                }
            });
        }

        expose('id', base.id);
        expose('internalId', base.internalId);
        expose('fetching', base.fetching);
        expose('fetched', base.fetched);
        expose('loaded', base.loaded);

        // Expose fields
        base.data.fields.forEach(function (field) {
            let property = field.name._ToCamel();
            expose(property, field.value);
        });

        lastUpdatedTime = data.lastUpdatedTime;

    }

    Object.defineProperty(this, 'values', {
        'get': function () {

            if (lastUpdatedTime === base.data.lastUpdatedTime) {
                return values;
            }

            update();
            return values;

        }
    });

}
