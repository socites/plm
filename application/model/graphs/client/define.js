define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;
    let registries = plm.registries;
    let auth = plm.auth;

    registries.items.add(ChannelEntry, {
        'module': module,
        'actions': {
            'data': 'channel/data',
            'tu': 'channel/tu',
            'publish': 'channel/publish'
        },
        'auth': auth,
        'fields': ['time_updated', 'name'],
        'cache': 'chanelEntry'
    });
    registries.collections.add(Channel, ChannelEntry, {
        'module': module,
        'actions': {
            'fetch': 'channel/list'
        },
        'cache': {
            'key': 'channel',
            'max': 30
        }
    });

    registries.items.add(GraphItem, {
        'module': module,
        'actions': {
            'data': 'graphs/data',
            'tu': 'graphs/tu',
            'publish': 'graphs/publish'
        },
        'auth': auth,
        'fields': ['time_updated', 'name'],
        'cache': 'graph'
    });
    registries.collections.add(GraphsCollection, GraphItem, {
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
        'Channel': Channel,
        'ChannelEntry': ChannelEntry,
        'GraphsCollection': GraphsCollection,
        'GraphItem': GraphItem
    };

});
