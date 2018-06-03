exports = module.react.createControl({
    'render': function (state, actions) {
        "use strict";

        if (!state.ready) {
            return null;
        }

        let output = [];
        output.push(
            <h3 className="page-header" key="header">
                {(state.fetched) ? 'Edit form' : 'Loading...'}
            </h3>
        );

        if (state.fetched) {
            output.push(<react.form key="form" actions={actions} state={state}/>);
        }

        return (
            <div>{output}</div>
        );

    }
});
