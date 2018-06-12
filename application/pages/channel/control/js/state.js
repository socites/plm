function updateState(controller, state, properties) {
    "use strict";

    let channel = controller.channel;

    console.log("channel", channel.items);
    state.items = channel.items;

}
