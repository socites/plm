function Students(specs) {

    var Collection = module.plm.Collection;

    var collection = new Collection(this, specs);

    collection.Item = Student;

    collection.module = module;
    collection.fetch = {
        'action': 'students/get'
    };

}
