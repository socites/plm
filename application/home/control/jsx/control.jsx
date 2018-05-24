exports = module.react.createControl({
    'render': function (state, actions) {
        "use strict";

        var output = [];

       output.push(
           <h3 className="page-header">
               Progressive loading Model
           </h3>
       )

        return (
            <div>{output}</div>
        );

    }
});
