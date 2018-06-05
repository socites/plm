function updateState(controller, state, properties) {
    "use strict";

    let student = controller.student;

    state.fetched = student.fetched;
    state.student = {
        'name': student.name
    };

    state.new = controller.new;
    properties.processing = (!state.new && !student.fetched) || student.fetching || student.updating;


}
