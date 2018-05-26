module.exports = new (function () {

    let data = new Map();
    data.set('1', {'id': '1', 'time_updated': 10, 'name': 'Henry'});
    data.set('2', {'id': '1', 'time_updated': 20, 'name': 'Julio'});
    data.set('3', {'id': '1', 'time_updated': 30, 'name': 'Juan'});
    data.set('4', {'id': '1', 'time_updated': 40, 'name': 'Felix'});

    function getUpdatedTimes(ids) {
        return [...ids].map(function (id) {
            return {'id': id, 'time_updated': data.get(id).time_updated};
        });
    }

    this.get = function (ids, specs) {

        if (!ids) {
            return getUpdatedTimes([...data.keys()]);
        }

        ids = new Set(ids);

        if (specs === 'time_updated') {
            return getUpdatedTimes([...ids]);
        }
        else {
            return [...ids].map(id => data.get(id));
        }

    };

});
