define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;

    // Register Student factory
    plm.registry.add('students', Student);

    return {
        'Students': Students
    };

});
