function PLMCache() {
    "use strict";

    let lastId = 0;
    let storages = new Map();

    let initialised;

    function clean() {

        lastId = 0;
        localStorage.removeItem('cache.storages');

        for (let key of Object.keys(localStorage)) {
            if (key.substr(0, 6) !== 'cache.') {
                continue;
            }
            localStorage.removeItem(key);
        }

    }

    this.clean = clean;

    function initialise() {

        if (initialised) {
            return;
        }

        initialised = true;

        let data = localStorage.getItem('cache.storages');
        if (!data) {
            return;
        }

        try {

            data = JSON.parse(data);
            lastId = data.lastId;

            for (let key in data.storages) {
                storages.set(key, {'id': data.storages[key]});
            }

        }
        catch (exc) {
            console.error(exc.stack);
            console.error('Error while reading cache.storages:', storages);
            clean();
        }

    }

    function save() {

        let store = {};
        storages.forEach(function (record, key) {
            store[key] = record.id;
        });

        let save = {
            'lastId': lastId,
            'storages': store
        };
        localStorage.setItem('cache.storages', JSON.stringify(save));

    }

    this.get = function (key) {

        let record;
        if (!storages.has(key)) {
            record = {'id': lastId++};
            storages.set(key, record);
        } else {
            record = storages.get(key);
        }

        record.storage = (record.storage) ? record.storage : new PLMStorage(record.id);

        setTimeout(save, 0);

        return record.storage;

    };

    initialise();

}
