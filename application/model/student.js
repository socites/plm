function Student(id, timeUpdated) {

    let plm = module.plm;
    let item = plm.factory.get('students', id);

    let comments = new Graphs();

    item.set = function (data) {

        console.log(data);

    };

}
