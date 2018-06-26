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

    // Expose counter
    let counter = {};
    Object.defineProperty(values, 'counter', {
        'get': function () {
            return counter;
        }
    });
    Object.defineProperty(counter, 'loading', {
        'get': function () {
            return base.counter.loading;
        }
    });
    Object.defineProperty(counter, 'loaded', {
        'get': function () {
            return base.counter.loaded;
        }
    });
    Object.defineProperty(counter, 'value', {
        'get': function () {
            return base.counter.value;
        }
    });

}
