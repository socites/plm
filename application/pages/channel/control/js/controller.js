function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    let channel = new model.ChannelEntries();
    Object.defineProperty(this, 'channel', {
        'get': function () {
            return channel;
        }
    });

    channel.bind('change', change);
    channel.load({
        'items': {
            'graph': {
                'owner': {
                    'followers': {'counter': true}
                },
                'comments': {'counter': true}
            }
        }
    });

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}
