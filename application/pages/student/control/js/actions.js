function Actions(controller, properties) {
    "use strict";

    this.publish = function () {

        let student = controller.student;
        if (!student.isUnpublished) {
            beyond.showMessage('Item is saved');
            return;
        }

        student.publish({'session': 'session.key.default'}).then(function () {
            beyond.showMessage('Item has been saved');
        });

    };

    this.initialise = function (refs) {

        refs.name.addEventListener('change', function (event) {

            if (!controller.ready) {
                return;
            }

            let student = controller.student;
            student.name = event.currentTarget.value;

        });

    };

    this.refresh = function () {

        if (!controller.ready) {
            return;
        }

        controller.student.load();

    };

}
