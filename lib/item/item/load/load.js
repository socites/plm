function ItemLoad(base) {

    let specs = new LoadSpecs();

    // The proxy is responsible to set the loaded property.
    // When the item is loaded, then the proxy calls the .onLoaded method.
    // The .onLoaded method is responsible to initialise the item (fields and maps) if them
    // where not initialised in the constructor of the item.
    // If the initialisation goes wrong, then the loaded continue being false.
    let loaded;
    Object.defineProperty(base, 'loaded', {
        'get': () => !!loaded,
        'set': (value) => loaded = !!value
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

                        base.events.trigger('change', base.instanceId);

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
                    resolve({'specs': values});

                }

            }

        });

    };

}
