function ItemLoadSpecs() {

    let values = {};
    let self = this;

    function merge(values, specs, expose) {

        for (let elem in specs) {

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

            if (expose && typeof self[elem] === 'undefined') {
                Object.defineProperty(self, elem, {
                    'get': function () {
                        return values[elem];
                    }
                });
            }

            merge(values[elem], value);

        }

    }

    this.merge = function (specs) {
        merge(values, specs, true);
    };

}
