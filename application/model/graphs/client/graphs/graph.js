function Graph(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return item.data.time_updated;
        }
    });

    Object.defineProperty(this, 'description', {
        'get': function () {
            return item.data.description;
        },
        'set': function (value) {
            item.data.description = value;
        }
    });

    this.load = function (specs) {

        item.load(specs).then(function (specs) {

            // TODO: continue loading student

        });

    };

}
