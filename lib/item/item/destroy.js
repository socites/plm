function ItemDestroy(base) {

    let destroyed;
    Object.defineProperty(base, 'destroyed', {'get': () => !!destroyed});

    /**
     * Destroy the item when it was never persisted.
     */
    base.destroy = function () {

        if (base.id) {
            throw new Error('Item cannot be destroyed if it was previously persisted. Use remove method instead.');
        }

        destroyed = true;
        base.events.trigger('destroyed');
        base.events.trigger('change', base.instanceId);

    };

}
