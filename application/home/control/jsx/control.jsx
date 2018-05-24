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

        state.students.map(function (student) {
            console.log(student);
            output.push(<div key={student.id}>
                {student.id} {student.timeUpdated}
            </div>);
        });

        return (
            <div>{output}</div>
        );

    }
});
