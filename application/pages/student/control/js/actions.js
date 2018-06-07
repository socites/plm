function Actions(controller) {
    "use strict";

    let refs;
    this.addRefs = function (references) {
        refs = references;
    }
    this.publish = function () {

        let student = controller.student;

        student.publish({'name': refs.name.value}).then(function () {
            beyond.showMessage('Item has been saved');
        });

    };

    this.refresh = function () {

        if (!controller.ready) {
            return;
        }

        controller.student.load({'update': true});

    };

}
