function Page($container, vdir, dependencies) {
    "use strict";

    var texts = {
        'title': 'My first page'
    };
    var $page = $(module.render('page', texts));
    $container
        .attr('id', 'new-control-model-page')
        .append($page);

    var control = $container.children('new-control-model');

}