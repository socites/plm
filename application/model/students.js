function Students(specs) {

    var Collection = module.plm.Collection;

    specs = (specs) ? specs : {};
    specs.server = {'path': 'students/get'};
    specs.factory = 'students';

    var collection = new Collection(this, specs);

}
