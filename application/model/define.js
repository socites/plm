define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;

    // Register Student factory
    var factory = plm.factories.register('students', Student);

    return {
        'Student': Student,
        'Students': Students,
        'factories': factory
    };

});
