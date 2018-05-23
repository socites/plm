(function (beyond) {
    "use strict";

    var server = new beyond.Server('server.json', {'environment': 'development'});
    server.start();

})(require('beyond'));
