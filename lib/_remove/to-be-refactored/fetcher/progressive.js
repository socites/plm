function ProgressiveFetcher(base, exports) {
    "use strict";

    var promise, resolve, reject;
    var actions = {};

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


    /**
     * Process the list of entries by comparing from cache, and retrieving/updating the
     * data of those that are not in cache, or outdated.
     * The response is received as an associative collection of id: time_updated.
     *
     * @param dataId {string} Required to retrieve the data of the items.
     * @param entries {array} The entries retrieved from the server. {id: time_updated}
     * @returns {Promise}
     */
    var updateList = Delegate(this, function (dataId, entries) {

        if (base.destroyed) {
            return;
        }

        var ids = [];
        for (var id in entries) {

            var meta = entries[id];
            var timeUpdated, counters;
            if (typeof meta === 'number') {
                timeUpdated = meta;
            } else {
                timeUpdated = meta.time_updated;
                counters = meta.counters;
            }

            // The '!' is a hack to avoid the array to be ordered
            var itemId = id.replace('!', '');

            var item = base.Item(itemId, timeUpdated);
            if (!item.loaded) {
                item.loadFromCache();
            }

            if (item.counters) {
                item.counters = meta.counters;
            }

            // Request the data of the item only if it is not updated in local cache
            if (!item.updated && !item.fetching) {
                ids.push(id);
            }

        }

        return new Promise(Delegate(this, function (resolve, reject) {

            if (!ids.length) {
                // All entries are updated
                updateData(entries);
                resolve();
                return;
            }

            var params = {
                'dataId': dataId,
                'ids': ids
            };
            var actionPath = base.actionsPaths.entriesGet + '/data';
            var action = new module.Action(actionPath, params);
            actions.data = action;

            action.onResponse = function (response) {

                if (base.destroyed) {
                    return;
                }

                actions.data = undefined;

                updateData(entries, response);
                resolve();

            };

            action.onError = function (error) {

                if (base.destroyed) {
                    return;
                }

                actions.data = undefined;

                if (error.code === action.ERROR_CODE.CANCELED) {
                    return;
                }

                var message;
                if (error.data && error.data.code === 0) message = error.data.message;
                else if (error.message) message = error.message;
                else message = 'Server execution error';

                base.error = {'code': base.ERROR_CODE.SERVER_ERROR, 'message': message};
                reject(base.error);

            };

            action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

        }));

    });

    /**
     * The data received from the server
     * of the entries that were outdated or not present in the cache store.
     * @param entries The entries retrieved from the server on the first round trip of the fetch.
     * @param data The updated data of the entries that are not updated in local cache.
     */
    var updateData = Delegate(this, function (entries, data) {

        if (base.destroyed) {
            return;
        }

        if (!data) {
            data = {};
        }

        var updated = new Map();

        for (var id in entries) {

            var item;
            var timeUpdated = entries[id];
            if (typeof timeUpdated === 'object') {
                timeUpdated = entries[id].time_updated;
            }

            // The '!' is a php hack to avoid the array to be ordered
            var itemId = id.replace('!', '');

            var itemData = data[id];
            if (itemData) {
                item = base.Item(itemId, timeUpdated);
                item.update(itemData, timeUpdated);
            }
            else if (base.entries.has(itemId)) {
                item = base.entries.get(itemId);
            } else {
                item = base.Item(itemId, timeUpdated);
                if (!item.loaded) {
                    item.loadFromCache();
                }
            }

            if (!item.updated && !item.fetching) {
                console.error(
                    'An outdated item was detected.',
                    id, itemData, base.entries.has(id),
                    item.timeUpdated, item.fetching, item,
                    JSON.parse(JSON.stringify(item)), entries, data);
            }

            updated.set(itemId, item);

        }

        if (base.dataSource === DATA_SOURCE.SERVER) {
            updated.forEach(function (item, id) {
                base.setEntry(id, item);
            });
        } else {
            base.entries = updated;
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

        var actionPath = base.actionsPaths.entriesGet + '/entries';
        var action = new module.Action(actionPath, params);
        actions.entries = action;

        fetching = true;
        base.events.trigger('change');

        action.onResponse = function (response) {

            if (base.destroyed) {
                return;
            }

            base.pagesCount += 1;
            actions.entries = undefined;

            updateList(response.dataId, response.entries)
                .then(function () {

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

                    resolve();
                    cleanPromise();
                    base.events.trigger('change');

                })
                .catch(function (error) {

                    if (error instanceof Error) {
                        base.error = {'code': base.ERROR_CODE.INTERNAL_ERROR, 'exc': error};
                        console.log(error.stack);
                    } else {
                        base.error = error;
                    }

                    fetching = false;
                    cleanPromise();
                    base.events.trigger('change');

                });

        };

        action.onError = function (error) {

            if (base.destroyed) {
                return;
            }

            actions.entries = undefined;

            if (error.code === action.ERROR_CODE.CANCELED) {
                return;
            }
            if (error.code === action.ERROR_CODE.EXECUTION) {

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

        if (actions.entries) {
            actions.entries.cancel();
        }
        if (actions.data) {
            actions.data.cancel();
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
