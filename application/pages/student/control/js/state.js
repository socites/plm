function updateState(controller, state, properties) {
    "use strict";

    let student = controller.student;

    state.fetched = student.fetched;
    state.student = {
        'name': student.name
    };

    properties.processing = !student.fetched || student.fetching || student.updating;

}
