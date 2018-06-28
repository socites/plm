function Metamodel() {

    let entities = new Entities();
    Object.defineProperty(this, 'entities', {
        'get': function () {
            return entities;
        }
    });

    let loaded;
    Object.defineProperty(this, 'loaded', {
        'get': function () {
            return !!loaded;
        }
    });

    let promise;

    function set(data) {

        entities.set(data);
        loaded = true;

    }

    let stored = localStorage.getItem('metamodel');

    if (stored) {

        try {
            stored = JSON.parse(stored);
        }
        catch (exc) {
            console.warn('Invalid metamodel local cache', stored);
            localStorage.removeItem('metamodel');
            stored = undefined;
        }

    }

    // Remove metamodel data from local cache if it is not valid
    if (stored && !stored.entities) {
        console.warn('Invalid metamodel local cache');
        localStorage.removeItem('metamodel');
        stored = undefined;
    }

    if (stored) {
        set(stored);
    }

    function load() {

        promise = new Promise(function (resolve, reject) {

            let action = new module.Action('/metamodel/get');
            action.onResponse = function (response) {

                promise = undefined;
                set(response);
                localStorage.setItem('metamodel', JSON.stringify(response));

                resolve();

            };
            action.onError = function (response) {
                reject(response);
            };

            action.execute({'policy': action.POLICY.COMMUNICATION_ERRORS});

        });

        return promise;

    }

    this.load = function () {

        if (promise) {
            return promise;
        }

        if (loaded) {
            return new Promise(resolve => resolve());
        }

        return load();

    };

}

module.metamodel = new Metamodel();
