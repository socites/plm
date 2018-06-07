function Page($container) {
    "use strict";

    let texts = {'title': 'Students list'};
    let $page = $(module.render('page', texts));

    $container
        .attr('id', 'students-list-page')
        .append($page);

    new Toolbar($container);

}
