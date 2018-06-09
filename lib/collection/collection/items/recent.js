function RecentlyCreatedItems(items, base) {

    let recent = [];
    Object.defineProperty(this, 'items', {
        'get': function () {
            return recent;
        }
    });

    function triggerChange() {
        base.events.trigger('change');
    }

    this.unshift = function (item) {

        recent.unshift(item);

        item.bind('change', triggerChange);

        function onPublished() {

            if (!item.id) {
                console.log('Item with its id was expected after being published:', item);
                throw new Error('Item with its id was expected after being published');
            }
            unbind();

            recent.splice(recent.indexOf(item), 1);
            items.unshift(item);

            base.events.trigger('change');

        }

        function unbind() {
            item.unbind('published', onPublished);
        }

        item.bind('published', onPublished);
        item.bind('destroyed', unbind);

        triggerChange();

    };

}
