function Page($container) {
    "use strict";

    var texts = {'title': 'Students list'};
    var $page = $(module.render('page', texts));

    $container
        .attr('id', 'students-list-page')
        .append($page);

    var spinner = $container.find('paper-toolbar paper-spinner').get(0);
    var control = $container.find('students-list').get(0);

    control.addEventListener('processing-changed', function () {
        spinner.active = control.processing;
    })

}
