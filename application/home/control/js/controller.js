function Controller(change, dependencies, properties, specs) {
    "use strict";

    var model = dependencies.model;
    var students = new model.Students();

    students.load();
    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

    this.update = function () {


    };

}
