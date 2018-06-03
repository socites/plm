function ItemPublish(base) {

    let publishing;
    Object.defineProperty(base, 'publishing', {
        'get': function () {
            return !!publishing;
        }
    });

    let promise;

    base.publish = function () {

        if (promise) {
            return promise;
        }

        promise = new Promise(function (resolve, reject) {

            // Publish item
            console.log('publish item');
            resolve();

        });

        return promise;

    };

}
