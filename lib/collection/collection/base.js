function CollectionBase(attributes, registry) {
    "use strict";

    let events = new Events({'bind': this});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
        }
    });

    Object.defineProperty(this, 'attributes', {
        'get': function () {
            return attributes;
        }
    });

    let ERRORS = Object.freeze({
        'NONE': 0,
        'INVALID_RESPONSE': 1
    });
    Object.defineProperty(this, 'ERRORS', {
        'get': function () {
            return ERRORS;
        }
    });

    let error;
    Object.defineProperty(this, 'error', {
        'get': function () {
            return error;
        },
        'set': function (value) {
            error = value;
        }
    });

    let entries = new CollectionEntries(this, registry);
    let fetch = new CollectionFetch(this, entries, registry);
    let load = new CollectionLoad(this);
    new CollectionClean(this, entries, fetch, load);

    this.cache = new CollectionCache(this, registry, entries);

    this.toJSON = function () {
        return (this.fetched) ? this.entries.toJSON() : undefined;
    };

}
