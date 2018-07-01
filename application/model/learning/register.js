function Register(registries) {

    // Register Student item.
    registries.items.register(Student, {
        'module': module,
        'actions': {
            'data': 'students/data',
            'tu': 'students/tu',
            'publish': 'students/publish',
            'remove': 'students/remove'
        },
        'auth': true,
        'cache': 'student'
    });

    // Register Students collection.
    registries.collections.register(Students, Student, {
        'module': module,
        'actions': {
            'fetch': 'students/list'
        },
        'cache': {
            'key': 'students',
            'max': 30
        }
    });

}
