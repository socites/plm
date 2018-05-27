function ItemCache(item) {
    "use strict";

    if (!item) throw new Error('Invalid parameters');

    Object.defineProperty(this, 'id', {
        'get': function () {
            return item.cacheContainer + '.' + item.id;
        }
    });

    this.save = function () {

        if (!item.cacheContainer || !item.id) {
            console.error('Cannot save an item that was not persisted or does not have set its id',
                item.cacheContainer, item.id);

            return;
        }

        try {
            data = JSON.parse(JSON.stringify(item));
        }
        catch (exc) {
            console.error('Cannot save item "' + item.id + '" due to an error on its data. ' +
                'Check window._item', item);
            window._item = item;
            return;
        }

        timeUpdated = item.timeUpdated;
        localStorage.setItem(this.id, JSON.stringify({'timeUpdated': timeUpdated, 'data': data}));

    };

    this.clean = function () {
        data = undefined;
        timeUpdated = undefined;
        localStorage.removeItem(this.id);
    };

    this.load = function () {

        var stored = localStorage.getItem(this.id);
        if (stored) {

            try {
                stored = JSON.parse(stored);
                data = stored.data;
                timeUpdated = stored.timeUpdated;
            }
            catch (exc) {
                console.warn('Channel item cache is invalid', data);
                this.clean();
            }

        }

    };

    var data, timeUpdated;
    Object.defineProperty(this, 'data', {
        'get': function () {
            if (!data) {
                this.load();
            }
            return data;
        }
    });
    Object.defineProperty(this, 'timeUpdated', {
        'get': function () {
            return timeUpdated;
        }
    });

}
