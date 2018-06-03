function Page($container, vdir) {
    "use strict";

    let texts = {'title': 'Student edit'};
    let $page = $(module.render('page', texts));
    $container
        .addClass('student-edit-page')
        .append($page);

    let control = $container.children('student-edit').get(0);
    control.studentId = vdir;

    new Toolbar($container);

}
