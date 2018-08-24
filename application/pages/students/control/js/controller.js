function Controller(change, dependencies, properties, specs) {
    "use strict";

    let model = dependencies.model;

    let students = new model.Students({'limit': 5}, 'session.key.default');
    Object.defineProperty(this, 'students', {
        'get': function () {
            return students;
        }
    });
    students.bind('change', change);

    // Load from cache, and update the collection.

    console.log(students);

    students.load({'update': true, 'limit': 5, 'offset': 0});

    Object.defineProperty(this, 'ready', {
        'get': function () {
            return true;
        }
    });

}
