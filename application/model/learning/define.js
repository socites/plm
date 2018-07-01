define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;

    new AuthManager(plm.auth);
    new Register(plm.registries);

    return {
        'Students': Students,
        'Student': Student
    };

});
