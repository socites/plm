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
        }
    });

    let data = []; // the entries received by the server
    let entries = []; // the entries obtained by the factory
    Object.defineProperty(this, 'data', {
        'get': function () {
            return data;
        },
        'set': function (value) {
            data = value;
            for (let id in data) {
                entries.push(Item) // id, timeUpdated
            }
        }
    });
    Object.defineProperty(this, 'entries', {
        'get': function () {
            return entries;
        }
    });

    new CollectionFetch(this, registry);
    new CollectionLoad(this);

}
