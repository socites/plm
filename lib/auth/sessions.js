function Sessions() {

    let sessions = new Map();
    Object.defineProperty(this, 'keys', {
        'get': function () {
            return sessions.keys();
        }
    });
    Object.defineProperty(this, 'values', {
        'get': function () {
            return sessions.values();
        }
    });

    this.register = function (name) {

        if (sessions.has(name)) {
            throw new Error('Session already registered');
        }

        let session = new Session(name);
        sessions.set(name, session);

    };

    this.unregister = function (name) {

        if (!sessions.has(name)) {
            throw new Error('Session is not registered');
        }

        sessions.delete(name);

    };

    this.get = function (name) {
        return sessions.get(name);
    };

    this.has = function (name) {
        return sessions.has(name);
    };

}
