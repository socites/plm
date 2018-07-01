function updateState(controller, state, properties) {
    "use strict";

    state.relation = controller.relation.getters;

    console.log('state', state.relation);

}
