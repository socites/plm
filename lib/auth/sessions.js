function Sessions() {

    let sessions = new Map();
    Object.defineProperty(this, 'keys', {'get': () => sessions.keys()});
    Object.defineProperty(this, 'values', {'get': () => sessions.values()});

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

    this.get = (name) => sessions.get(name);
    this.has = (name) => sessions.has(name);

}
