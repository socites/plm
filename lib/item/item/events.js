function ItemEvents(item, base) {

    function triggerChange() {
        events.trigger('change');
    }

    let size = 0;

    function binding() {
        if (size === 1) {
            base.events.bind('change', triggerChange);
        }
        else if (size === 0) {
            base.events.unbind('change', triggerChange);
        }
    }

    let events = new Events();
    item.bind = function (event) {
        size += (event === 'change') ? 1 : 0;
        binding();
        return events.bind.call(events, ...arguments);
    };
    item.unbind = function (event) {
        size -= (event === 'change') ? 1 : 0;
        binding();
        return events.unbind.call(events, ...arguments);
    };

}
