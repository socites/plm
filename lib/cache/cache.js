function PLMCache() {

    let storages = new Map();

    this.get = function (id) {

        if (storages.has(id)) {
            return storages.get(id);
        }

        let storage = new CacheStorage(id);
        storages.set(id, storage);

        return storage;

    };

}
