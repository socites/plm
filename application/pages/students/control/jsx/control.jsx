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

            if (student.removed) {
                return;
            }

            let item = [];
            item.push(<div key="data">
                {(student.id) ? student.id : 'unpublished'}
                {(student.name) ? ' ' + student.name : ' unnamed'}
                {(student.updating) ? ' updating' : ''} {(student.fetching) ? ' fetching' : ''}
                {(student.fetched) ? ' fetched' : ''}
                {(student.timeUpdated) ? ' ' + student.timeUpdated : ''}
            </div>);

            if (student.removing) {
                item.push(<div key="removing" className="removing">Item is being removed</div>);
            } else {
                item.push(<react.actions key="actions" index={index} actions={actions} student={student}/>);
            }

            list.push(<div key={student.id} className="item">{item}</div>);

        });

        output.push(list);

        return (
            <div>{output}</div>
        );

    }
});
