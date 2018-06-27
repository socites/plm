module.exports = function () {
    "use strict";

    // Get items by id
    this.tu = require('./get/tu.js');
    this.data = require('./get/data.js');

    // List items
    this.list = require('./get/list');

    // Get count of items
    this.count = require('./count.js');

    this.publish = require('./publish.js');

};
