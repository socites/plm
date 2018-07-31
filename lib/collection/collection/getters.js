function CollectionGetters(base) {
    'use strict';

    let values = {};
    Object.defineProperty(this, 'values', {'get': () => values});

    function expose(property) {
        Object.defineProperty(values, property, {'get': () => base[property]});
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
    Object.defineProperty(values, 'counter', {'get': () => counter});
    Object.defineProperty(counter, 'loading', {'get': () => base.counter.loading});
    Object.defineProperty(counter, 'loaded', {'get': () => base.counter.loaded});
    Object.defineProperty(counter, 'value', {'get': () => base.counter.value});

}
