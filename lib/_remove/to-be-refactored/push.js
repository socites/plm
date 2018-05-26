function Push(base, exports) {
    "use strict";

    exports.push = function (item) {

        if (!item) {
            throw new Error('Invalid parameters');
        }

        if (!base.cache.initialised) {
            exports.loadFromCache();
        }

        if (item.id) {

            // Just in case that the item was pushed before it was persisted
            exports.splice(item);
            base.setEntry(item.id, item, true);

        }
        else {

            for (var i in base.pushed) {
                if (base.pushed[i] === item) {
                    return;
                }
            }

            base.addPushed(item);

        }

        base.updateCache();

        base.events.trigger('pushed', item);
        base.events.trigger('change');

    };

    exports.splice = function (item) {

        var index = base.pushed.indexOf(item);
        if (index === -1) {
            return;
        }

        if (!base.cache.initialised) {
            exports.loadFromCache();
        }

        base.deletePushed(item);
        base.updateCache();

        base.events.trigger('change');

    };

}
