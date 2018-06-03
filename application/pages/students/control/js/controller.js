function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    let students = new model.Students();
    Object.defineProperty(this, 'students', {
        'get': function () {
            return students;
        }
    });

    students.bind('change', change);

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}