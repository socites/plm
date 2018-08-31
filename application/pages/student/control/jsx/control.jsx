exports = module.react.createControl({
    'render': function (state, actions) {

        if (!state.ready) {
            return null;
        }

        let output = [];

        if (!state.new) {
            output.push(
                <h3 className="page-header" key="header">
                    {(state.student.fetched) ? 'Edit form' : 'Loading...'}
                </h3>
            );
        }
        else {
            output.push(
                <h3 className="page-header" key="header">Add new student.</h3>
            );
        }


        if (state.student.fetched || state.new) {
            output.push(<react.form key="form" actions={actions} state={state}/>);
        }

        return <div>{output}</div>;

    }
});
