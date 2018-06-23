function Student(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    item.initialise({
        'fields': ['time_updated', 'name'],
        'maps': {}
    });

    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return item.data.time_updated;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return item.data.name;
        },
        'set': function (value) {
            item.data.name = value;
        }
    });

    this.load = function (specs) {

        item.load(specs).then(function (specs) {

            // TODO: continue loading student

        });

    };

}
