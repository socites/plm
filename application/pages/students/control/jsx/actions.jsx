exports = React.createClass({
    'render': function () {

        let actions = this.props.actions;
        let student = this.props.student;
        let index = this.props.index;

        let buttons = [];

        buttons.push(
            <paper-button data-index={index} onClick={actions.update} key="update">
                update
            </paper-button>
        );

        buttons.push(
            <paper-button data-id={student.id} onClick={actions.edit} key="edit">
                edit
            </paper-button>
        );

        buttons.push(
            <paper-button data-index={index} onClick={actions.remove} key="remove">
                remove
            </paper-button>
        );

        return (<div className="actions">{buttons}</div>);

    }
});
