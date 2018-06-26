function CollectionCounters(base, registry, specs) {

    let all = new CollectionCounter(base, registry);
    Object.defineProperty(this, 'all', {
        'get': function () {
            return all;
        }
    });

    let filters = new Map();
    Object.defineProperty(this, 'filters', {
        'get': function () {
            return filters.keys();
        }
    });

    let self = this;

    for (let name in specs) {

        if (!specs.hasOwnProperty(name)) {
            return;
        }

        let attributes = specs[name];
        filters.set(name, new CollectionCounter(base, registry, attributes));

        Object.defineProperty(self, name, {
            'get': function () {
                return filters.get(name);
            }
        });

    }

    this.has = function (name) {
        return filters.has(name);
    };

}
