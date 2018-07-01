function Page($container, vdir) {
    "use strict";

    let texts = {'title': 'User following'};
    let $page = $(module.render('page', texts));
    $container
        .addClass('user-following-page')
        .append($page);

    let control = $container.children('user-following').get(0);

    new Toolbar($container);

}
