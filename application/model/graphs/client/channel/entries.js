function ChannelEntries(attributes, session) {
    'use strict';

    let Collection = module.plm.Collection;
    new Collection(this, {'attributes': attributes, 'session': session});

}
