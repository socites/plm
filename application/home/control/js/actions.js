function Actions(controller, properties) {
    "use strict";

    this.initialise = function () {
        properties.userId = '1';
    };

    this.reset = function () {
        properties.userId = undefined;
    };

    this.refresh = function () {
        console.log('refresh');
    };

}
