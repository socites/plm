module.exports = function () {
    "use strict";

    this.graphs = new (require('./graphs'))();
    this.channel = new (require('./channel'))();

};
