function updateState(controller, state, properties) {
    "use strict";

    state.students = controller.students.entries;
    properties.processing = true;

}
