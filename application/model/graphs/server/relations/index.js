module.exports = function () {
    "use strict";

    // Get items by id
    this.tu = require('./get/tu.js');
    this.data = require('./get/data.js');

    // List items
    this.list = require('./list');

    // Find a relation with the attributes from and to
    this.find = require('./find');

    // Get count of items
    this.count = require('./count');

    this.publish = require('./publish.js');

};
