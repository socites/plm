function AuthBridge() {
    "use strict";

    let events = new Events({'bind': this});

    let accessToken;
    Object.defineProperty(this, 'accessToken', {
        'get': function () {
            return accessToken;
        },
        'set': function (value) {
            accessToken = value;
            events.trigger('change');
        }
    });

}
