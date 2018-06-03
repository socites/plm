function PLMStorage(id) {
    "use strict";

    id = 'cache.' + id;

    Object.defineProperty(this, 'id', {
        'get': function () {
            return id;
        }
    });

    Object.defineProperty(this, 'stored', {
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

            return stored;

        }
    });

    Object.defineProperty(this, 'lastAccessedTime', {
        'get': function () {
            let stored = this.stored;
            return (stored) ? stored.lastAccessedTime : 0;
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

            let stored = this.stored;
            if (!stored) {
                return;
            }

            let data = stored.data;

            stored.lastAccessedTime = Date.now();
            localStorage.setItem(id, JSON.stringify(stored));

            return data;

        },
        'set': function (value) {

            let stored = (this.stored) ? this.stored : {};
            stored.data = value;
            stored.lastAccessedTime = Date.now();

            stored = JSON.stringify(stored);

            localStorage.setItem(id, stored);

        }
    });

    this.clean = function () {
        localStorage.removeItem(this.id);
    };

}
