function Student(id) {

    let Item = module.plm.Item;
    let item = new Item(this, id);

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

    let classroom;
    Object.defineProperty(this, 'classroom', {
        'get': function () {
            return classroom;
        }
    });

    this.load = function (params) {

        item.load(params).then(function (specs) {
            console.log('continue loading...', specs);
        });

    };

}
