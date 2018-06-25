function ItemLoad(base) {
    "use strict";

    let specs = new LoadSpecs();

    let loaded;
    Object.defineProperty(base, 'loaded', {
        'get': function () {
            return !!loaded;
        },
        'set': function (value) {
            loaded = !!value;
        }
    });

    /**
     * Request for progressive loading the item.
     *
     * @param params The specifications of the load request
     * @param session
     * @returns {Promise} The promise for the fetch method
     */
    base.load = function (params, session) {

        specs.merge(params);

        if (base.fetching) {

            return new Promise(function (resolve) {

                base.fetch(session).then(function (data) {

                    let values = specs.values;
                    specs.clean();
                    resolve({'specs': values, 'data': data});

                });

            });

        }

        return new Promise(function (resolve, reject) {

            if (loaded && !specs.update) {

                let values = specs.values;
                specs.clean();
                resolve({'specs': values});

            }
            else {

                if (typeof specs.fetch === 'undefined' || specs.fetch) {

                    base.fetch(session).then(function (data) {

                        loaded = true;
                        base.events.trigger('change');

                        let values = specs.values;
                        specs.clean();
                        resolve({'specs': values, 'data': data});

                    }).catch(function (exc) {

                        specs.clean();
                        reject(exc);

                    });

                } else {

                    let values = specs.values;
                    specs.clean();
                    resolve({'specs': values, 'data': data});

                }

            }

        });

    };

}
