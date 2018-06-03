/**
 * The load specifications for items and collections
 *
 * @param params.defaults defaults The defaults
 * @param params.overwrite Overwrite defaults
 * @param params.specs
 * @constructor
 */
function LoadSpecs(params) {

    params = (params) ? params : {};

    let defaults = params.defaults;
    let overwrite = !!params.overwrite;
    let specs = params.specs;

    defaults = (defaults) ? defaults : {};
    defaults.update = (typeof defaults.update !== 'boolean') ? false : defaults.update;
    defaults.fetch = (typeof defaults.fetch !== 'boolean') ? true : defaults.fetch;

    let values = {};
    let self = this;

    Object.defineProperty(this, 'values', {
        'get': function () {
            return Object.assign({}, values);
        }
    });

    function setDefaults(specs) {

        if (overwrite) {
            specs.update = defaults.update;
            specs.fetch = defaults.fetch;

            return;
        }

        // Default of specs.update is false.
        specs.update = (typeof specs.update !== 'boolean') ? defaults.update : specs.update;

        // Default of specs.fetch is true.
        specs.fetch = (typeof specs.fetch !== 'boolean') ? defaults.fetch : specs.fetch;

    }

    function merge(values, specs) {

        setDefaults(specs);

        for (let elem in specs) {

            if (!specs.hasOwnProperty(elem)) continue;

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

        merge(values, specs);
        exposeProperties();

    };

    this.clean = function () {
        values = {};
    };

    if (specs) {
        this.merge((specs instanceof LoadSpecs) ? specs.values : specs);
    }

}
