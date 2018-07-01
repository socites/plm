exports = React.createClass({
    'send': function () {
        this.refs.form.submit();
    },
    'componentDidMount': function () {

        let form = this.refs.form;
        let actions = this.props.actions;

        actions.initialise(this.refs);

        form.addEventListener('iron-form-presubmit', actions.publish);

    },
    'render': function () {

        let state = this.props.state;

        let disabled = {};
        if (state.student.processing) {
            disabled.disabled = true;
        }

        return (
            <form key="form" is="iron-form" ref="form">
                <paper-input
                    {...disabled}
                    label="Name"
                    ref="name"
                    key="name" value={state.student.name}
                />
                <paper-button {...disabled} onClick={this.send}>Guardar</paper-button>
            </form>
        );

    }
});
