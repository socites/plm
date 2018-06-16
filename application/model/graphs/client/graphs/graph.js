function Graph(id, session) {
    'use strict';

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    item.maps.register({'property': 'timeUpdated', 'source': 'time_updated', 'readOnly': true});
    item.maps.register({'property': 'description', 'source': 'description'});

    let comments = new Graphs({'container': this, 'entity': '22'}, session);
    Object.defineProperty(this, 'comments', {
        'get': function () {
            return comments;
        }
    });

    this.load = function (specs) {

        item.load(specs).then(function (specs) {

            if (specs.comments) {
                comments.load(specs.comments);
            }

        });

    };

}
