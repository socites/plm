function ChannelEntry(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    item.initialise({
        'fields': ['time_updated', 'comment', 'graph_id'],
        'maps': {
            'timeUpdated': {'source': 'time_updated', 'readOnly': true},
            'comment': 'comment',
            'graph': {'source': 'graph_id', 'Item': Graph}
        }
    });

}
