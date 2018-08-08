function RecentlyCreatedItems(items, base) {
    'use strict';

    let recent = [];
    Object.defineProperty(this, 'items', {'get': () => recent});

    let triggerChange = (instanceId) => base.events.trigger('change', instanceId);

    this.unshift = function (item) {

        recent.unshift(item);

        item.bind('change', triggerChange);

        function onPublished(instanceId) {

            if (!item.id) {
                console.log('Item with its id was expected after being published:', item);
                throw new Error('Item with its id was expected after being published');
            }
            unbind();

            recent.splice(recent.indexOf(item), 1);
            items.unshift(item);

            base.events.trigger('change', instanceId);

        }

        function unbind() {
            item.unbind('published', onPublished);
        }

        item.bind('published', onPublished);
        item.bind('destroyed', unbind);

        triggerChange(base.instanceId);

    };

}
