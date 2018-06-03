function Actions(controller, properties) {
    "use strict";

    this.publish = function () {
        console.log('publish item');
    };

    this.refresh = function () {

        if (!controller.ready) {
            return;
        }

        controller.student.load({'update': true});

    };

}
