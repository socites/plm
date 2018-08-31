function Actions(controller, properties) {
    'use strict';

    this.update = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.items[index];

        if (student.id) student.update();

    };

    this.edit = (event) => beyond.navigate(`/student/edit/${event.currentTarget.dataset.id}`);

    this.remove = function (event) {

        let index = event.currentTarget.dataset.index;
        let student = controller.students.items[index];

        student.remove({'session': 'session.key.default'});

    };

    this.refresh = () => controller.students.load({'update': true});

    this.add = () => beyond.navigate('/student/edit/new');

}
