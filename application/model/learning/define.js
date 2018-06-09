define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;
    let registries = plm.registries;
    let auth = plm.auth;

    // Register Student item.
    registries.items.register(Student, {
        'module': module,
        'actions': {
            'data': 'students/data',
            'tu': 'students/tu',
            'publish': 'students/publish'
        },
        'auth': auth,
        'fields': ['time_updated', 'name'],
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
        },
        'push': function (collection, item) {
            console.log(collection, item);
        }
    });

    return {
        'Students': Students,
        'Student': Student
    };

});
