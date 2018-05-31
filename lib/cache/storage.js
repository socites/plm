function CacheStorage(id) {

    Object.defineProperty(this, 'id', {
        'get': function () {
            return id;
        }
    });

    Object.defineProperty(this, 'lastTimeAccessed', {
        'get': function () {

        }
    });

    Object.defineProperty(this, 'size', {
        'get': function () {
            let data = localStorage.getItem(id);
            return (data) ? (id.length + data.length) * 2 : 0;
        }
    });

    Object.defineProperty(this, 'data', {
        'get': function () {
            let stored = localStorage.getItem(id);

            try {
                stored = JSON.parse(stored);
            }
            catch (exc) {
                console.error(exc.stack);
                console.warn('Cache element is invalid:', stored);
                this.clean();
            }
        }
    });

    this.save = function (data) {
        localStorage.setItem(id, data);
    };

    this.clean = function () {
        localStorage.removeItem(this.id);
    };

}
