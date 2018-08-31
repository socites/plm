function updateState(controller, state, properties) {

    let students = controller.students;

    state.students = students.items;
    properties.processing = (!students.loaded || students.fetching);

}
