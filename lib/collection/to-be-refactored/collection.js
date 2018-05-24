window.DATA_SOURCE = Object.freeze({
    'NO_LOADED': 0,
    'CACHE': 1,
    'SERVER': 2
});

function Collection(exports, specs) {
    "use strict";

    if (typeof specs !== 'object') {
        specs = {};
    }

    var limit = (specs.limit) ? specs.limit : 30;
    Object.defineProperty(this, 'limit', {
        'get': function () {
            return limit;
        }
    });

    // Descendant order (asc === '0') is the default
    var asc = (specs.asc === '1') ? '1' : '0';
    Object.defineProperty(this, 'asc', {
        'get': function () {
            return asc;
        }
    });

    var events = new Events({'bind': exports});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
        }
    });

    var pushed = [];
    Object.defineProperty(this, 'pushed', {
        'get': function () {
            return pushed;
        }
    });

    Object.defineProperty(exports, 'pushed', {
        'get': function () {
            return pushed;
        }
    });

    // Map does not assure the order of items
    var entriesOrder = [];
    var entries = new Map();
    Object.defineProperty(this, 'entries', {
        'get': function () {
            return entries;
        },
        'set': function (value) {

            // Unbind all replaced entries
            entries.forEach(function (item) {
                unbindItem(item);
            });

            entries = value;
            entriesOrder = [];

            // Bind the new entries
            entries.forEach(function (item) {

                bindItem(item);
                if (!item.id) {
                    console.warn('Collection item must specify its id', item);
                }
                else {
                    entriesOrder.push(item.id);
                }

            });

        }
    });

    Object.defineProperty(exports, 'entries', {
        'get': function () {

            var output = [];
            for (var index in entriesOrder) {
                var id = entriesOrder[index];
                var item = entries.get(id);

                output.push(item);
            }

            if (asc === '0') {
                return pushed.concat(output);
            }
            else {
                return output.concat(pushed);
            }

        }
    });

    var pagesCount = 0;
    Object.defineProperty(this, 'pagesCount', {
        'get': function () {
            return pagesCount;
        },
        'set': function (value) {
            pagesCount = value;
        }
    });

    Object.defineProperty(exports, 'pagesCount', {
        'get': function () {
            return pagesCount;
        }
    });

    function onItemChange(event) {
        events.trigger('change', event);
    }

    function bindItem(item) {

        if (typeof item.bind === 'function' &&
            typeof item.unbind === 'function') {

            item.unbind('change', onItemChange);
            item.bind('change', onItemChange);
        }

    }

    function unbindItem(item) {

        if (typeof item.bind === 'function' &&
            typeof item.unbind === 'function') {

            item.unbind('change', onItemChange);

        }

    }

    this.setEntry = function (key, item, isNew) {

        if (entries.has(key)) {
            return;
        }

        bindItem(item);
        entries.set(key, item);

        if (isNew && asc === '0') {
            entriesOrder.unshift(key);
        }
        else {
            entriesOrder.push(key);
        }

    };

    this.deleteEntry = function (key) {

        var item = entries.get(key);
        if (item) {
            unbindItem(item);
            entries.delete(key);
        }

    };

    this.addPushed = function (item) {

        bindItem(item);
        if (asc === '0') {
            pushed.unshift(item);
        }
        else {
            pushed.push(item);
        }

    };

    this.deletePushed = function (item) {

        var index = pushed.indexOf(item);
        if (index === -1) {
            return;
        }

        unbindItem(pushed[index]);
        pushed.splice(index, 1);

    };

    Object.defineProperty(exports, 'length', {
        'get': function () {
            return pushed.length + exports.entries.length;
        }
    });

    var dataSource = DATA_SOURCE.NO_LOADED;
    Object.defineProperty(exports, 'dataSource', {
        'get': function () {
            return dataSource;
        }
    });
    Object.defineProperty(this, 'dataSource', {
        'get': function () {
            return dataSource;
        },
        'set': function (value) {
            dataSource = value;
        }
    });

    var ERROR_CODE = Object.freeze({
        'NO_ERROR': 0,
        'INTERNAL_ERROR': 1,
        'SERVER_ERROR': 2,
        'INVALID_CACHE': 3
    });
    Object.defineProperty(this, 'ERROR_CODE', {
        'get': function () {
            return ERROR_CODE;
        }
    });
    Object.defineProperty(exports, 'ERROR_CODE', {
        'get': function () {
            return ERROR_CODE;
        }
    });

    var error = ERROR_CODE.NO_ERROR;
    Object.defineProperty(this, 'error', {
        'get': function () {
            return error;
        },
        'set': function (value) {
            error = value;
        }
    });
    Object.defineProperty(exports, 'error', {
        'get': function () {
            return error;
        }
    });

    // Boolean
    var loaded;
    Object.defineProperty(exports, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return !!loaded;
        },
        'set': function (value) {
            loaded = value;
        }
    });

    var cache = new Cache(this, exports);
    var load = new CollectionLoad(this, exports);
    var push = new Push(this, exports);

    if (!specs.fetcher || specs.fetcher !== 'base') {
        new ProgressiveFetcher(this, exports);
    } else {
        new Fetcher(this, exports);
    }

    var destroyed;
    Object.defineProperty(this, 'destroyed', {
        'get': function () {
            return !!destroyed;
        },
        'set': function (value) {
            destroyed = value;
        }
    });

    exports.destroy = function () {

        destroyed = true;

        // Unbind all replaced entries
        entries.forEach(function (item) {
            unbindItem(item);
        });

        for (var index in pushed) {
            unbindItem(pushed[index]);
        }

        entries = undefined;
        pushed = undefined;
        events.unbind();

    };

}
