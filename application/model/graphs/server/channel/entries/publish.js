module.exports = require('async')(function* (resolve, reject, params) {

    function add() {

        let item = {
            'id': (data.length + 1).toString(),
            'time_updated': tu,
            'name': params.name
        };

        data.push(item);

        return item;

    }

    function update() {

        let position = getPosition(id);
        if (!position) {
            return;
        }

        let item = Object.assign(data[position], {
            'time_updated': tu,
            'name': params.name
        });
        data[position] = item;

        return item;

    }

    setTimeout(function () {

        return (params.id) ? update() : add();

    });

});
