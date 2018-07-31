function ItemsManager(Collection, Item) {

    let events = new Events({'bind': this});

    if (!module.registries.items.has(Item)) {
        let message = 'Item defined in the collections must be previously defined';
        console.error(message, Collection, Item);

        throw new Error(message);
    }

    let registry = module.registries.items.get(Item);
    registry.bind('created', function (item) {
        events.trigger('created', item);
    });

}
