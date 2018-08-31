function Controller(change, dependencies, properties, specs) {
    'use strict';

    let model = dependencies.model;

    let student;
    let newStudent = false;
    Object.defineProperty(this, 'new', {'get': () => newStudent});
    Object.defineProperty(this, 'student', {'get': () => student});

    Object.defineProperty(this, 'ready', {'get': () => !!student || newStudent});

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

        if (properties.studentId === 'new') {
            newStudent = true;
            properties.studentId = undefined;
        }

        student = new model.Student(properties.studentId, 'session.key.default');
        student.bind('change', change);

        if (!newStudent) {
            student.load({'update': true});
        }


    };

}
