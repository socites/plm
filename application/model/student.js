function Student(id) {

    let Item = module.plm.Item;
    let item = new Item(this, id);

    let data = item.data;

    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return data.time_updated;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return data.name;
        },
        'set': function (value) {
            data.name = value;
        }
    });

}
