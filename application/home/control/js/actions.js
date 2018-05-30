function Actions(controller, properties) {
    "use strict";

    this.update = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.entries[index];
console.log(student); window.asd = student;
        student.update().then(function () {
            beyond.showMessage('Item updated');
        });

    };

}
