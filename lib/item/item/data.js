function ItemData(base) {

    let data = {};
    Object.defineProperty(base, 'data', {
        'get': function () {
            return data;
        }
    });

    this.set = function (fields) {

        for (let field in fields) {
            data[field] = fields[field];
        }

    };

}
