function updateState(controller, state, properties) {
    "use strict";

    let student = controller.student;

    state.student = student.getters;
    state.new = controller.new;

    properties.processing = student.processing;

}
