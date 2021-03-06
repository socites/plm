function Controller(change, dependencies, properties, specs) {
    'use strict';

    let model = dependencies.model;

    let students = new model.Students({'attributes': {'limit': 5}}, 'session.key.default');
    Object.defineProperty(this, 'students', {'get': () => students});
    students.bind('change', change);

    // Load from cache, and update the collection.

    console.log(students);

    students.load({'update': true});

    Object.defineProperty(this, 'ready', {'get': () => true});

}
