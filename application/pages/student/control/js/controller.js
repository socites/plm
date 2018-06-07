function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    let student;
    let newStudent = false;
    Object.defineProperty(this, 'new', {
        'get': function () {
            return newStudent;
        }
    });
    Object.defineProperty(this, 'student', {
        'get': function () {
            return student;
        }
    });

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return !!student || newStudent;
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

        if (properties.studentId == "new") {
            newStudent = true;
            properties.studentId = undefined;
        }

        student = new model.Student(properties.studentId);
        student.accessToken = '123456';
        student.bind('change', change);
        if (!!properties.studentId) {
            student.load({'update': true});
        }


    };

}
