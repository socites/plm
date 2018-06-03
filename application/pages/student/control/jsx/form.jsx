exports = React.createClass({
    'send': function () {
        this.refs.form.submit();
    },
    'componentDidMount': function () {

        let form = this.refs.form;
        let actions = this.props.actions;

        form.addEventListener('iron-form-presubmit', actions.publish);

    },
    'render': function () {

        let state = this.props.state;

        return (
            <form key="form" is="iron-form" ref="form">
                <paper-input key="name" value={state.student.name}></paper-input>
                <paper-button onClick={this.send}>Guardar</paper-button>
            </form>
        );

    }
});
