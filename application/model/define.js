define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;
    let registries = plm.registries;

    // Register Student factory
    registries.items.add(Student, {
        'module': module,
        'actions': {
            'data': 'students/data',
            'tu': 'students/tu'
        },
        'fields': ['time_updated', 'name'],
        'cache': 'student'
    });
    registries.collections.add(Students, Student, {
        'module': module,
        'actions': {
            'fetch': 'students/list'
        },
        'cache': 'students'
    });

    return {
        'Students': Students,
        'Student': Student
    };

});
