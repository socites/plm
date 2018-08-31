function Page($container) {

    let texts = {'title': 'Channel view'};
    let $page = $(module.render('page', texts));

    $container
        .attr('id', 'plm-graphs-channel-page')
        .append($page);

    new Toolbar($container);

}
