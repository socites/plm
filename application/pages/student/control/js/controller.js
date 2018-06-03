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
        console.log(properties);
    };

}
