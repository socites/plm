function updateState(controller, state, properties) {

    state.items = controller.channel.getters;
    properties.processing = controller.channel.fetching;

    console.log('channel', state.items);

}
