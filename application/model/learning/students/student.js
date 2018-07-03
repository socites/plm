function Student(id, session) {

    let Item = module.plm.Item;
    let item = new Item(this, id, session);

    item.initialise({
        'fields': ['time_updated', 'name', 'removed'],
        'maps': {
            'timeUpdated': {'source': 'time_updated', 'readOnly': true},
            'name': 'name',
            'removed': 'removed'
        }
    });

}
