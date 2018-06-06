var cprocess = require('child_process');
var cwd = process.cwd();

var cmd = 'npm publish';
cprocess.execSync(
    cmd, {
        'cwd': cwd,
        'stdio': [0, 1, 2]
    });
