function Actions(controller) {
    "use strict";

    this.publish = function () {

        let student = controller.student;

        student.publish().then(function () {
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
