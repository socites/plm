define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;
    let registries = plm.registries;

    new AuthManager(plm.auth);

    // Register ChannelEntry item
    registries.items.register(ChannelEntry, {
        'module': module,
        'actions': {
            'data': 'channel/entries/data',
            'tu': 'channel/entries/tu',
            'publish': 'channel/entries/publish'
        },
        'auth': true,
        'fields': ['time_updated', 'name'],
        'cache': 'chanelEntry'
    });

    // Register ChannelEntries collection
    registries.collections.register(ChannelEntries, ChannelEntry, {
        'module': module,
        'actions': {
            'fetch': 'channel/entries/list'
        },
        'cache': {
            'key': 'channel',
            'max': 30
        }
    });

    // Register Graph item
    registries.items.register(GraphItem, {
        'module': module,
        'actions': {
            'data': 'graphs/data',
            'tu': 'graphs/tu',
            'publish': 'graphs/publish'
        },
        'auth': true,
        'fields': ['time_updated', 'name'],
        'cache': 'graph'
    });

    // Register Graphs collection
    registries.collections.register(GraphsCollection, GraphItem, {
        'module': module,
        'actions': {
            'fetch': 'graphs/list'
        },
        'cache': {
            'key': 'graphs',
            'max': 30
        }
    });

    return {
        'ChannelEntries': ChannelEntries,
        'ChannelEntry': ChannelEntry,
        'GraphsCollection': GraphsCollection,
        'GraphItem': GraphItem
    };

});
