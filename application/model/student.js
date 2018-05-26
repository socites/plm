function Student(id, timeUpdated) {

    let plm = module.plm;
    let item = plm.factory.get(this, id, timeUpdated);

    let comments = new Graphs();

    item.set = function (data) {

        console.log(data);

    };

}
