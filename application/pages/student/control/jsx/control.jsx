exports = module.react.createControl({
    'render': function (state, actions) {
        "use strict";

        if (!state.ready) {
            return null;
        }

        let output = [];

        output.push(
            <h3 className="page-header" key="header">
                Edit form
            </h3>
        );

        output.push(
            <form key="form" is="iron-form">
                <paper-input key="name" value={state.student.name}></paper-input>
                <paper-button>Guardar</paper-button>
            </form>
        );

        return (
            <div>{output}</div>
        );

    }
});
