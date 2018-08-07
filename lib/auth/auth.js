function AuthBridge() {
    'use strict';

    let sessions = new Sessions();
    Object.defineProperty(this, 'sessions', {'get': () => sessions});

    this.set = function (sessionName, accessToken) {

        let session;
        if (!sessions.has(sessionName)) {
            session = new Session(sessionName);
        } else {
            session = sessions.get(sessionName);
        }

        session.accessToken = accessToken;

    };

}
