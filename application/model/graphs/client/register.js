function Register(registries) {

    // Register ChannelEntry item
    registries.items.register(ChannelEntry, {
        'module': module,
        'actions': {
            'data': 'channel/entries/data',
            'tu': 'channel/entries/tu',
            'publish': 'channel/entries/publish'
        },
        'auth': true,
        'cache': 'channel.entry'
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
    registries.items.register(Graph, {
        'module': module,
        'actions': {
            'data': 'graphs/data',
            'tu': 'graphs/tu',
            'publish': 'graphs/publish'
        },
        'auth': true,
        'cache': 'graph'
    });

    // Register Graphs collection
    registries.collections.register(Graphs, Graph, {
        'module': module,
        'actions': {
            'fetch': 'graphs/list',
            'count': 'graphs/count'
        },
        'cache': {
            'key': 'graphs',
            'max': 30
        }
    });

    // Register Relation item
    registries.items.register(Relation, {
        'module': module,
        'actions': {
            'data': 'relations/data',
            'tu': 'relations/tu',
            'publish': 'relations/publish',
            'remove': 'relations/remove'
        },
        'auth': true,
        'cache': 'relation'
    });

    // Register Graphs collection
    registries.collections.register(Relations, Relation, {
        'module': module,
        'actions': {
            'fetch': 'relations/list',
            'count': 'relations/count'
        },
        'cache': {
            'key': 'relations',
            'max': 30
        }
    });

}
