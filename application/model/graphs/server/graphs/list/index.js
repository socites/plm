module.exports = require('async')(function* (resolve, reject, params) {

    if (params.container instanceof Array) {
        resolve(yield (require('./containers.js'))(params));
    } else {
        throw new Error('Invalid parameters');
    }

});
