exports = React.createClass({
    'send': function () {
        this.refs.form.submit();
    },
    'componentDidMount': function () {

        let form = this.refs.form;
        let actions = this.props.actions;
        actions.addRefs(this.refs);
        form.addEventListener('iron-form-presubmit', actions.publish);

    },
    'render': function () {

        let state = this.props.state;

        let disabled = {};
        if (state.properties.processing) {
            disabled.disabled = true;
        }

        return (
            <form key="form" is="iron-form" ref="form">
                <paper-input
                    {...disabled}
                    ref="name"
                    key="name" value={state.student.name}
                />
                <paper-button {...disabled} onClick={this.send}>Guardar</paper-button>
            </form>
        );

    }
});
