function ItemBase(item, id, timeUpdated) {
    "use strict";

    let events = new Events({'bind': this});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
        }
    });

    let ERRORS = Object.freeze({
        'NONE': 0,
        'INVALID_RESPONSE': 1
    });

    let properties = new Properties(item);
    properties.define({
        'fetching': 'boolean',
        'fetched': 'boolean',
        'loaded': 'boolean',
        'ERRORS': 'object',
        'id': 'string',
        'timeUpdated': 'number'
    });
    Object.defineProperty(this, 'properties', {
        'get': function () {
            return properties;
        }
    });

    properties.id = id;
    properties.timeUpdated = timeUpdated;
    properties.ERRORS = ERRORS;

    new ItemFetch(item, this);
    new ItemLoad(item, this);

}
