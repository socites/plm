function CollectionEntries(base, registry) {

    let data; // The entries as they where received by the server.
    Object.defineProperty(this, 'data', {
        'get': function () {
            return data;
        }
    });

    let entries = new Map(); // The items instances.
    Object.defineProperty(base, 'entries', {
        'get': function () {
            return entries;
        }
    });

    function triggerChange() {
        base.events.trigger('change');
    }

    function clean() {

        entries.forEach(function (entry) {
            entry.unbind('change', triggerChange);
        });

        data = [];
        entries = [];

        base.events.trigger('change');

    }

    this.clean = clean;
    base.clean = clean;

    // The push method was designed to pass the data received from the server.
    this.push = function (values) {

        // When the collection is immutable, it means that the
        // items never change and do not require/support the updatedTime property.
        // They are always updated.
        if (registry.immutable) {

            // In this case the value received is an array of ids
            for (let id of values) {

                data.push(id);
                let entry = new registry.Item(id);
                entries.push(entry);

                entry.bind('change', triggerChange);

            }

        }
        else {

            // In this case the value received is an array of objects {id, updatedTime}
            for (let value of values) {

                data.push(value);
                let entry = new registry.Item(value.id);
                entry.updatedTime = value.updatedTime;
                entries.push(entry);

                entry.bind('change', triggerChange);

            }

        }

        base.events.trigger('change');

    };

}
