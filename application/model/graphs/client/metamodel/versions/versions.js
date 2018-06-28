function Versions() {

    let versions = new Map();
    Object.defineProperty(this, 'keys', {
        'get': function () {
            return versions.keys();
        }
    });
    Object.defineProperty(this, 'values', {
        'get': function () {
            return versions.values();
        }
    });

    let highest;
    Object.defineProperty(this, 'highest', {
        'get': function () {
            return versions.get(highest);
        }
    });

    this.set = function (value) {

        for (let id in value) {

            if (!value.hasOwnProperty(id)) continue;

            let version = value[id];
            versions.set(id, {
                'id': id,
                'fields': version.fields
            });

        }

        highest = (highest > id) ? highest : id;

    };

    this.get = function (value) {

        if (value === 'highest') {
            return this.highest;
        }

        return versions.get(value);

    };

    this.has = function (id) {
        return versions.has(id);
    }

}
