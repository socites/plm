function AuthBridge() {

    let sessions = new Sessions();
    Object.defineProperty(this, 'sessions', {'get': () => sessions});

    this.set = function (sessionName, accessToken) {

        let session = !sessions.has(sessionName) ? new Session(sessionName) : sessions.get(sessionName);
        session.accessToken = accessToken;

    };

}
