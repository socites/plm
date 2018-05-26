define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;

    // Register Student factory
    plm.registry.add(Student, {
        'module': module,
        'paths': {
            'fetch': 'students/get'
        }
    });

    return {
        'Students': Students
    };

});
