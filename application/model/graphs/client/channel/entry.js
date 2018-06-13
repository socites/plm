function ChannelEntry(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    item.maps.register({'property': 'timeUpdated', 'source': 'time_updated', 'readOnly': true});
    item.maps.register({'property': 'comment', 'source': 'comment'});
    item.maps.register({'property': 'graph', 'source': 'graph_id', 'Item': Graph});

    this.load = function (specs) {

        item.load(specs).then(function (specs) {

            // TODO: continue loading student

        });

    };

}
