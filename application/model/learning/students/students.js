function Students(attributes, session) {
    'use strict';

    let Collection = module.plm.Collection;
    new Collection(this, attributes, {'session': session});

}
