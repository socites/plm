function Student(id, timeUpdated) {

    var Item = module.plm.Item;
    var item = new Item(this, id, timeUpdated);

    item.setData = function (data) {

    };

    this.toJSON = function () {

    };

    item.recover = function (data) {

    };

}
