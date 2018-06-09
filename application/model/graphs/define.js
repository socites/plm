define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;
    let registries = plm.registries;
    let auth = plm.auth;
    // Register Student factory
    registries.items.add(Student, {
        'module': module,
        'actions': {
            'data': 'channel/data',
            'tu': 'channel/tu',
            'publish': 'channel/publish'
        },
       'auth': auth,
        'fields': ['time_updated', 'name'],
        'cache': 'student'
    });
    registries.collections.add(Students, Student, {
        'module': module,
        'actions': {
            'fetch': 'students/list'
        },
        'cache': {
            'key': 'students',
            'max': 30
        }
    });

    return {
        'Students': Students,
        'Student': Student
    };

});
