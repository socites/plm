function ItemGetters(base) {

    let values = {};
    Object.defineProperty(this, 'values', {
        'get': function () {
            return values;
        }
    });

    function expose(name, source) {

        source = (source) ? source : name;

        Object.defineProperty(values, name, {
            'get': function () {
                return base[source];
            }
        });

    }

    expose('id');
    expose('internalId');
    expose('fetching');
    expose('fetched');
    expose('loaded');

    // Expose fields
    base.data.fields.forEach(function (field) {
        let name = field.name._ToCamel();
        expose(name, field.name);
    });

}
