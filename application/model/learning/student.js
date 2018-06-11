function Student(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return item.time_updated;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return item.name;
        },
        'set': function (value) {
            item.name = value;
        }
    });

    this.load = function (params) {

        item.load(params).then(function (specs) {

            // TODO: continue loading student

        });

    };

}
