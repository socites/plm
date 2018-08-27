function updateState(controller, state, properties) {
    "use strict";

    let students = controller.students;
    state.students = students.items;
    state.more = controller.students.more;
    properties.processing = (!students.loaded || students.fetching);

}
