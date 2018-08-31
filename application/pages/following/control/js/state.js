function updateState(controller, state, properties) {

    state.relation = controller.relation.getters;

    console.log('state', state.relation);

}
