function CollectionBase(collection, Item, attributes) {

    let events = new Events({'bind': collection});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
        }
    });

    attributes = new CollectionAttributes(attributes);
    Object.defineProperty(this, 'attributes', {
        'get': function () {
            return attributes;
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
    Object.defineProperty(collection, 'entries', {
        'get': function () {
            return entries;
        }
    });

    new CollectionFetch(collection, this);
    new CollectionLoad(collection, this);

}
