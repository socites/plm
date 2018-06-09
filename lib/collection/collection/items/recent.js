function RecentlyCreatedItems(base) {

    let items = [];
    Object.defineProperty(this, 'items', {
        'get': function () {
            return items;
        }
    });

    function triggerChange() {
        base.events.trigger('change');
    }

    this.unshift = function (item) {

        items.unshift(item);

        item.bind('change', triggerChange);

        triggerChange();

    };

}
