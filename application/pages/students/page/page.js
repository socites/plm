function Page($container) {
    "use strict";

    var texts = {'title': 'Students list'};
    var $page = $(module.render('page', texts));

    $container
        .attr('id', 'students-list-page')
        .append($page);

}
