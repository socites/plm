function Actions(controller, properties) {
    "use strict";

    this.update = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.entries[index];

        student.update();

    };

}
