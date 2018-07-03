function ItemGetters(item) {
    "use strict";

    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            return values;
        }
    });

    function expose(property) {

        Object.defineProperty(values, property, {
            'get': function () {
                let value = item[property];
                return (typeof value === 'object') ? value.getters : value;
            }
        });

    }

    expose('id');
    expose('instanceId');
    expose('initialised');
    expose('fetching');
    expose('fetched');
    expose('loaded');
    expose('removing');
    expose('processing');
    expose('unpublished');
    expose('isUnpublished');

    this.initialise = function (maps) {

        // Expose maps
        for (let property of maps.keys) {
            expose(property);
        }

    };

}
