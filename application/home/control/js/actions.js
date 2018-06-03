function Actions(controller, properties) {
    "use strict";

    this.update = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.entries[index];

        student.update();

    };

    this.load = function () {
        controller.students.load();
    };

    this.loadFromCache = function () {
        console.log('load from cache');
        controller.students.load({'update': false, 'fetch': false});
    };

}
