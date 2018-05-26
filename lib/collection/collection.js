function CollectionBase(collection, specs) {

    let factories = module.factories;
    let factory;

    let events = new Events({'bind': collection});
    Object.defineProperty(this, 'events', {
        'get': function () {
            return events;
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

            if (!factory) {
                return;
            }

            for (let id in data) {
                entries.push(factory.get(id, entries[id])) // id, timeUpdated
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

    function initialise() {

        if (!this.Item) {
            throw new Error('Item property not set');
        }
        factory = factories.get(this.Item);

        if (!factory) {
            throw new Error(`Factory "${this.factory}" is not registered ` +
                `on collection "${collection.constructor.name}"`);
        }

    }

    // Give time to the collection to set all the attributes
    setTimeout(Delegate(this, initialise), 0);

}
