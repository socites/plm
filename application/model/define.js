define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;
    let registries = plm.registries;

    // Register Student factory
    registries.items.add(Student, {
        'module': module,
        'paths': {
            'fetch': 'students/get'
        }
    });
    registries.collections.add(Students, Student, {
        'module': module,
        'paths': {
            'fetch': 'students/get'
        }
    });

    return {
        'Students': Students,
        'Student': Student
    };

});
