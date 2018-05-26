function Student(id, timeUpdated) {

    let plm = module.plm;
    let item = plm.factory.get('students', id);

    item.set = function (data) {

        console.log(data);

    };

}
