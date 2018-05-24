function Students(specs) {

    var Collection = module.plm.Collection;
    var specs = {
        'server': {
            'path': 'students/get'
        }
    };

    var collection = new Collection(this, specs);
}
