module.exports = function () {
    "use strict";

    // Get items by id
    this.tu = require('./get/tu.js');
    this.data = require('./get/data.js');

    // List items
    this.list = require('./list');

    // Get count of items
    this.count = require('./count');

    this.publish = require('./publish.js');
    this.remove = require('./remove.js');

};
