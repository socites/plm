define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;

    // Register Student factory
    plm.factories.register('students', Student);

    return {
        'Students': Students
    };

});
