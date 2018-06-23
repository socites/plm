function CollectionGetters(base) {

    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            return values;
        }
    });

    function expose(name, source) {

        Object.defineProperty(values, name, {
            'get': function () {
                return base[source];
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
