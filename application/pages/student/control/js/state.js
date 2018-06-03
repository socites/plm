function updateState(controller, state) {
    "use strict";

    let student = controller.student;

    state.student = {
        'name': student.name
    };


}
