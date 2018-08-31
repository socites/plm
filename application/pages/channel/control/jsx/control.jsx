exports = module.react.createControl({
    'render': function (state, actions) {
        'use strict';

        if (!state.ready) {
            return null;
        }

        return (<h2 className="page-header">Channel</h2>);

    }
});
