module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    let timeUpdated = Date.now();

    if (params.data === 'timeUpdated') {

        resolve(
            {'a1': timeUpdated - 1000},
            {'a2': timeUpdated - 10000},
            {'a3': timeUpdated - 100000}
        );

    }
    else {

        resolve(
            {
                'a1': {
                    'timeUpdated': timeUpdated - 1000,
                    'field': 'value'
                }
            },
            {
                'a2': {
                    'timeUpdated': timeUpdated - 10000,
                    'field': 'value'
                }
            },
            {
                'a3': {
                    'timeUpdated': timeUpdated - 100000,
                    'field': 'value'
                }
            }
        );

    }

});
