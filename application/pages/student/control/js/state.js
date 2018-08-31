function updateState(controller, state, properties) {

    let student = controller.student;

    state.student = student.getters;
    state.new = controller.new;

    properties.processing = student.processing;

}
