exports = module.react.createControl({
    'render': function (state, actions) {

        if (!state.ready) {
            return null;
        }

        let output = [];
        output.push(<h2 key="h2" className="page-header">User following</h2>);
        output.push(<div key="details">Simulate user '1' following user '4'</div>);
        output.push(<paper-button key="add" onClick={actions.add}>Add</paper-button>);
        output.push(<paper-button key="remove" onClick={actions.remove}>Remove</paper-button>);

        return <div>{output}</div>;

    }
});
