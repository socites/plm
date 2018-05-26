function Student(id, timeUpdated) {

    let Item = module.plm.Item;
    let item = new Item(this);

    item.set = function (data) {

        console.log(data);

    };

}
