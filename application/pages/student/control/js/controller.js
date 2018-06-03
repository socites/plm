function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    let student;
    Object.defineProperty(this, 'student', {
        'get': function () {
            return student;
        }
    });

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return !!student;
        }
    });

    this.update = function () {

        if (!student && !properties.studentId) {
            return;
        }

        if (student && properties.studentId === student.id) {
            return;
        }

        if (student) {
            student.unbind('change');
            student = undefined;
        }

        if (!properties.studentId) {
            return;
        }

        student = new model.Student(properties.studentId);
        student.bind('change', change);
        student.load({'update': true});

    };

}
