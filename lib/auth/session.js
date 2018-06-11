function Session(name) {

    let events = new Events({'bind': this});

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });


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
