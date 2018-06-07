(function (beyond) {
    "use strict";

    var builder = new beyond.Builder('build.json',
        {'environment': 'development'});
    builder.build({
        'libraries': {
            'plm': {
                'client': './build/dev',
                'mode': 'beyond'
            }
        },
        'applications': false
    });

})(require('beyond'));
