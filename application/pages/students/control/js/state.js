function updateState(controller, state, properties) {
    "use strict";

    let students = controller.students;

    state.students = students.items;
    properties.processing = (!students.loaded || students.fetching);

}
