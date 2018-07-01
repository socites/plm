function Actions(controller, properties) {
    "use strict";

    this.publish = function () {

        controller.student.publish().then(function () {
            beyond.showMessage('Item has been saved');
        });

    };

    this.initialise = function (references) {

    };

    this.refresh = function () {

        if (!controller.ready) {
            return;
        }

        controller.student.load();

    };

}
