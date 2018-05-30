function Actions(controller, properties) {
    "use strict";

    this.update = function (event) {

        let id = event.currentTarget.dataset.id;
        let student = controller.students.get(id);

    };

}
