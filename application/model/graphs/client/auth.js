function AuthManager(authPLM) {
    'use strict';

    authPLM.sessions.register('session.key.default');
    let session = authPLM.sessions.get('session.key.default');
    session.accessToken = '1234';

}
