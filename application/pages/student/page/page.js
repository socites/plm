function Page($container, vdir) {
    "use strict";

    var texts = {'title': 'Student edit'};
    var $page = $(module.render('page', texts));
    $container
        .addClass('student-edit-page')
        .append($page);

    var control = $container.children('new-control-model');

}