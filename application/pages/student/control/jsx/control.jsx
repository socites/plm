exports = module.react.createControl({
    'render': function (state, actions) {
        "use strict";

        if (!state.ready) {
            return null;
        }

        let output = [];

        output.push(
            <div key="collection-actions">
                <paper-button onClick={actions.loadFromCache}>Fetch only from cache</paper-button>
                <paper-button onClick={actions.load}>Load</paper-button>
            </div>
        );

        output.push(
            <h3 className="page-header" key="header">
                Edit form
            </h3>
        );

        return (
            <div>{output}</div>
        );

    }
});
