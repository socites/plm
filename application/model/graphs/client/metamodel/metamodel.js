function Metamodel() {

    let entities = new Entities();
    Object.defineProperty(this, 'entities', {
        'get': function () {
            return entities;
        }
    });

    let relations = new Relations();
    Object.defineProperty(this, 'relations', {
        'get': function () {
            return relations;
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

        entities.set(data.entities);
        relations.set(data.relations);
        loaded = true;

    }

    let stored = localStorage.getItem('metamodel');
    if (stored) {
        set(stored);
    }

    function load() {

        promise = new Promise(function (resolve, reject) {

            let action = new module.Action('/metamodel/get');
            action.onResponse = function (response) {

                promise = undefined;
                set(response);
                localStorage.setItem('metamodel', response);

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

        return new Promise(function (resolve, reject) {

            if (loaded) {
                resolve();
                return;
            }

            return load();

        });

    };

}

module.metamodel = new Metamodel();
