function ItemLoad(base) {
    "use strict";

    let specs = new LoadSpecs();

    let loaded;
    Object.defineProperty(base, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    /**
     * Request for progressive loading the item.
     *
     * @param params The specifications of the load request
     * @returns {Promise} The promise for the fetch method
     */
    base.load = function (params) {

        specs.merge(params);

        if (base.id && !loaded && !base.published) {
            loaded = base.cache.load();
            (loaded) ? base.events.trigger('change') : undefined;
        }

        if (base.fetching) {

            return new Promise(function (resolve) {

                base.fetch().then(function () {

                    let values = specs.values;
                    specs.clean();
                    resolve(values);

                });

            });

        }

        return new Promise(function (resolve, reject) {

            if (loaded && !specs.update) {

                let values = specs.values;
                specs.clean();
                resolve(values);

            }
            else {

                if (typeof specs.fetch === 'undefined' || specs.fetch) {

                    base.fetch().then(function () {

                        loaded = true;
                        base.events.trigger('change');

                        let values = specs.values;
                        specs.clean();
                        resolve(values);

                    }).catch(function (exc) {

                        specs.clean();
                        reject(exc);

                    });

                } else {

                    let values = specs.values;
                    specs.clean();
                    resolve(values);

                }

            }

        });

    };

}
