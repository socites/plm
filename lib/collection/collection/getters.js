function CollectionGetters(base) {

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

        expose('fetching', base.fetching);
        expose('fetched', base.fetched);
        expose('loaded', base.loaded);

        let items = [];
        expose('items', items);

        for (let item of base.items) {
            items.push(item.getters);
        }

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
