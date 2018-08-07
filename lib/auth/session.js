function Session(name) {

    let events = new Events({'bind': this});

    Object.defineProperty(this, 'name', {'get': () => name});

    let accessToken;
    Object.defineProperty(this, 'accessToken', {
        'get': () => accessToken,
        'set': function (value) {
            accessToken = value;
            events.trigger('change');
        }
    });

}
