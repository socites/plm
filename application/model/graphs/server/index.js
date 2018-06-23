module.exports = function () {
    "use strict";

    this.metamodel = new (require('./metamodel'))();
    this.graphs = new (require('./graphs'))();
    this.channel = new (require('./channel'))();

};
