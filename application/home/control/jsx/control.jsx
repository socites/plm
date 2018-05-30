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
        state.students.map(function (student, index) {

            let item = [];
            item.push(<div key="data">
                {student.id} {student.name}
                {(student.updating) ? ' updating' : ''} {(student.fetching) ? ' fetching' : ''}
                {(student.fetched) ? ' fetched' : ''}
                {(student.timeUpdated) ? ' ' + student.timeUpdated : ''}
            </div>);

            item.push(
                <paper-button data-index={index} onClick={actions.update} key="button">
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
