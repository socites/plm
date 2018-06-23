function ItemGetters(base) {

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
        expose('items', base.data.getters);

    }

    Object.defineProperty(this, 'values', {
        'get': function () {

            if (values) {
                return values;
            }

            update();
            return values;

        }
    });

}
