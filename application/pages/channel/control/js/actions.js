function Actions(controller, properties) {
    "use strict";

    this.update = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.items[index];

        student.update();

    };

    this.edit = function (event) {
        beyond.navigate(`/student/edit/${event.currentTarget.dataset.id}`);
    };

    this.refresh = function () {
        controller.students.load({'update': true});
    };

    this.add = function () {
        beyond.navigate('/student/edit/new');
    };

}
