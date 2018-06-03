function Actions(controller, properties) {
    "use strict";

    this.update = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.entries[index];

        student.update();

    };

    this.edit = function (event) {
        beyond.navigate(`/student/edit/${event.currentTarget.dataset.id}`);
    };

    this.load = function () {
        controller.students.load();
    };

    this.loadFromCache = function () {
        controller.students.load({'update': false, 'fetch': false});
    };

}
