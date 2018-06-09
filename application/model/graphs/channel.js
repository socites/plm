function Student(id) {

    let Item = module.plm.Item;
    let item = new Item(this, id);
    let auth = module.plm.auth;

    let accessToken;
    Object.defineProperty(this, 'accessToken', {
        'get': function () {
            return accessToken;
        },
        'set': function (at) {
            accessToken = at;
            auth.accessToken = accessToken;
        }
    });

    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return item.time_updated;
        }
    });

    Object.defineProperty(this, 'name', {
        'get': function () {
            return item.name;
        },
        'set': function (value) {
            item.name = value;
        }
    });

    this.load = function (params) {

        item.load(params).then(function (specs) {

            // TODO: continue loading student

        });

    };

}
