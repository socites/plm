function Student(id) {

    let Item = module.plm.Item;
    let item = new Item(this, id);

    let data = item.data;

    Object.defineProperty(this, 'name', {
        'get': function () {
            return data.name;
        }
    });

}
