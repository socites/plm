exports = module.react.createControl({
    'render': function (state, actions) {
        "use strict";

        if (!state.ready) {
            return null;
        }

        let output = [];

        output.push(
            <div key="actions">
                <paper-button primary onClick={actions.add}>
                    Add Student
                </paper-button>
            </div>
        );

        if (state.students.length) {

            output.push(
                <h3 className="page-header" key="header">
                    List of students
                </h3>
            );

        }

        let list = [];
        state.students.map(function (student, index) {

            let item = [];
            item.push(<div key="data">
                {(student.id) ? student.id : 'unpublished'}
                {(student.name) ? ' ' + student.name : ' unnamed'}
                {(student.updating) ? ' updating' : ''} {(student.fetching) ? ' fetching' : ''}
                {(student.fetched) ? ' fetched' : ''}
                {(student.timeUpdated) ? ' ' + student.timeUpdated : ''}
            </div>);

            item.push(
                <paper-button data-index={index} onClick={actions.update} key="update">
                    update
                </paper-button>
            );

            item.push(
                <paper-button data-id={student.id} onClick={actions.edit} key="edit">
                    edit
                </paper-button>
            );

            list.push(item);

        });

        output.push(list);

        return (
            <div>{output}</div>
        );

    }
});
