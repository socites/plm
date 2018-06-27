module.exports = require('async')(function* (resolve) {
    "use strict";

    setTimeout(function () {

        let data;
        data = require('../data.js');

        let items = [...data.values];
        items.sort((a, b) => a - b);

        resolve({'records': items});

    }, 1000);

});
