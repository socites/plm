function Actions(controller, properties) {
    "use strict";

    let refs;
    this.addRefs = function (references) {
        refs = references;
    };

    this.publish = function () {

        let student = controller.student;
        let specs = {
            'name': refs.name.value
        };

        if (properties.studentId && properties.studentId !== 'new') {
            specs.id = properties.studentId;
        }

        student.publish(specs).then(function () {
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
