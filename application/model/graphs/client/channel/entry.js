function ChannelEntry(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return item.time_updated;
        }
    });

    Object.defineProperty(this, 'comment', {
        'get': function () {
            return item.comment;
        },
        'set': function (value) {
            item.comment = value;
        }
    });

    item.maps.register('graph', 'graph_id', Graph);
    Object.defineProperty(this, 'graph', {
        'get': function () {
            return item.maps.get('graph');
        }
    });

    this.load = function (specs) {

        item.load(specs).then(function (specs) {

            // TODO: continue loading student

        });

    };

}
