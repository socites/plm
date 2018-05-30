exports = module.react.createControl({
    'render': function (state, actions) {
        "use strict";

        if (!state.ready) {
            return null;
        }

        let output = [];

        output.push(
            <h3 className="page-header" key="header">
                Progressive loading Model
            </h3>
        );

        let list = [];
        state.students.map(function (student) {

            let item = [];
            item.push(<div key="data">
                {student.id} {student.timeUpdated} {student.name}
                {(student.updating) ? 'updating' : ''} {(student.fetching) ? 'fetching' : ''}
                {(student.fetched) ? 'fetched' : ''}
            </div>);

            item.push(
                <paper-button data-id={student.id} onClick={actions.update} key="button">
                    update
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
