/**
 *
 * @param itemId The itemId that is being requested
 * @param type Can be for time_updated only commitment, or full data commitment
 * @constructor
 */
function Commitment(itemId, type) {

    Object.defineProperty(this, 'itemId', {
        'get': function () {
            return itemId;
        }
    });

    let promise, resolve, reject;
    Object.defineProperty(this, 'promise', {
        'get': function () {
            return promise;
        }
    });
    Object.defineProperty(this, 'resolve', {
        'get': function () {
            return resolve;
        }
    });
    Object.defineProperty(this, 'reject', {
        'get': function () {
            return reject;
        }
    });

    promise = new Promise(function (_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });

}
