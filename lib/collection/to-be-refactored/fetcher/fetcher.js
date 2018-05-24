function Fetcher(base, exports) {
    "use strict";

    var promise, resolve, reject;
    var action;

    var fetching, fetched;
    Object.defineProperty(exports, 'fetching', {
        'get': function () {
            return !!fetching;
        }
    });
    Object.defineProperty(exports, 'fetched', {
        'get': function () {
            return !!fetched;
        }
    });

    // Where to start next page of items in the collection
    var start;
    Object.defineProperty(exports, 'more', {
        'get': function () {
            return !!start;
        }
    });

    function cleanPromise() {
        promise = undefined;
        resolve = undefined;
        reject = undefined;
    }

    function fetch() {

        if (fetching || base.destroyed) {
            return;
        }

        if (fetched && base.entries && base.entries.size && !start) {
            console.warn('There are no more items in the collection to be fetched');
            resolve();
            cleanPromise();
            return;
        }

        var params = base.setFetchParams();
        if (!params) params = {};
        if (start) params.start = start;
        params.limit = base.limit;

        var actionPath = base.actionsPaths.entriesGet;
        var action = new module.Action(actionPath, params);

        fetching = true;
        base.events.trigger('change');

        action.onResponse = function (response) {

            if (base.destroyed) {
                action = undefined;
                return;
            }

            base.pagesCount += 1;

            var entries = new Map();

            for (var id in response) {
                var item = base.Item(id, response[id]);
                entries.set(id, item);
            }

            if (base.dataSource === DATA_SOURCE.SERVER) {
                entries.forEach(function (item, id) {
                    base.setEntry(id, item);
                });
            } else {
                base.entries = entries;
            }

            base.dataSource = DATA_SOURCE.SERVER;
            base.loaded = true;
            fetching = false;
            fetched = true;
            base.error = undefined;

            // Save only the first page of results
            if (!start) {
                base.updateCache();
            }
            start = response.next;

            action = undefined;

            resolve();
            cleanPromise();
            base.events.trigger('change');

        };

        action.onError = function (error) {

            if (base.destroyed) {
                action = undefined;
                return;
            }

            if (error.code === action.ERROR_CODE.CANCELED) {
                action = undefined;
                return;
            }
            if (error.code === action.ERROR_CODE.EXECUTION) {

                action = undefined;
                fetching = false;
                base.error = {'code': base.ERROR_CODE.SERVER_ERROR, 'message': error.data};

                reject(base.error);
                cleanPromise();
                base.events.trigger('change');

            }

        };

        action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

    }

    base.fetch = function () {

        if (base.destroyed) {
            return;
        }

        if (fetching) {
            return promise;
        }

        var _promise = new Promise(function (_resolve, _reject) {
            resolve = _resolve;
            reject = _reject;
        });

        promise = _promise;

        fetch();
        return _promise;

    };

    exports.clean = function (specs) {

        if (base.destroyed) {
            throw new Error('Collection was destroyed');
        }

        if (action) {
            action.cancel();
        }

        fetching = false;
        fetched = false;
        base.loaded = false;
        start = undefined;
        base.error = undefined;
        base.entries = new Map();
        base.dataSource = DATA_SOURCE.NO_LOADED;

        base.pagesCount = 0;

        if (!specs || !specs.avoidChangeEvent) {
            base.events.trigger('change');
        }

    };

}
