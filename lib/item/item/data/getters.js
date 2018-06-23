function ItemDataGetters(data, fields) {

    let values;
    let lastUpdatedTime;

    function update() {

        values = {};

        function expose(property, value) {

            property = property._ToCamel();

            Object.defineProperty(values, property, {
                'get': function () {
                    return value;
                }
            });

        }

        fields.forEach(field => expose(field.name, field.value));

        lastUpdatedTime = data.lastUpdatedTime;

    }

    Object.defineProperty(this, 'values', {
        'get': function () {

            if (lastUpdatedTime && lastUpdatedTime === data.lastUpdatedTime) {
                return values;
            }

            update();
            return values;

        }
    });

}
