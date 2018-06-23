function updateState(controller, state, properties) {
    "use strict";

    state.items = controller.channel.getters;
    properties.processing = controller.channel.fetching;

}
