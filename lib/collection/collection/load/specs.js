function CollectionLoadSpecs() {

    let values = {};
    let self = this;

    function merge(specs) {

        for (let elem in specs) {

            if (elem === 'update') {
                // If some of the load calls requested to update the item,
                // then update must be true.
                values.update = (values.update || specs.update);
                continue;
            }
            else if (elem === 'fetch') {
                // If some of the load calls requested to fetch the item,
                // then fetch must be true.
                values.fetch = (values.fetch || specs.fetch);
                continue;
            }

            let value = specs[elem];
            if (!value) {
                continue;
            }

            if (typeof value !== 'object') {
                value = {};
            }

            if (!values[elem]) {
                values[elem] = {};
            }

            merge(values[elem], value);

        }

    }

    function exposeProperties() {

        for (let property in values) {

            if (!values.hasOwnProperty(property)) continue;
            if (self.hasOwnProperty(property)) continue;

            Object.defineProperty(self, property, {
                'get': function () {
                    return values[property];
                }
            });

        }

    }

    this.merge = function (specs) {

        // Default of specs.update is false.
        specs.update = (typeof specs.update !== 'boolean') ? false : specs.update;

        // Default of specs.fetch is true.
        specs.fetch = (typeof specs.fetch !== 'boolean') ? true : specs.fetch;

        merge(specs);

        exposeProperties();

    };

    this.clean = function () {
        values = {};
    };

}
