function Student(id, timeUpdated) {

    let Item = module.plm.Item;
    let item = new Item(this, id, timeUpdated);

    item.update = function (data) {

        console.log(data);

    };

}
