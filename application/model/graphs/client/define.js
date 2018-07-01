define(['libraries/plm/main/code'], function (plm) {

    module.plm = plm;

    new AuthManager(plm.auth);
    new Register(plm.registries);

    return {
        'ChannelEntries': ChannelEntries,
        'ChannelEntry': ChannelEntry,
        'Graphs': Graphs,
        'Graph': Graph,
        'Relation': Relation
    };

});
