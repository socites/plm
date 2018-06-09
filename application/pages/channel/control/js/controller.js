function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    var channel = model.Channel();
    Object.defineProperty(this, 'channel', {
        'get': function () {
            return channel;
        }
    });

    channel.bind('change', change);
    channel.load({'update': true});

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}
