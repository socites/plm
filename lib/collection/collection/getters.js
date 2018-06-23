function CollectionGetters(base) {

    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            return values;
        }
    });

    function expose(property) {

        Object.defineProperty(values, property, {
            'get': function () {
                return base[property];
            }
        });

    }

    expose('fetching');
    expose('fetched');
    expose('loaded');

    Object.defineProperty(values, 'items', {
        'get': function () {
            let items = [];
            base.items.map(item => items.push(item.getters));
            return items;
        }
    });

}
