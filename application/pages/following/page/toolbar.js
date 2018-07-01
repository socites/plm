function Toolbar($container) {

    let control = $container.children('user-following').get(0);
    let spinner = $container.find('paper-toolbar paper-spinner').get(0);
    let refresh = $container.find('paper-toolbar paper-icon-button.refresh').get(0);
    let back = $container.find('paper-toolbar paper-icon-button.back').get(0);

    function update() {
        spinner.active = !!control.processing;
        refresh.disabled = !!control.processing;
    }

    control.addEventListener('processing-changed', update);
    update();

    refresh.addEventListener('click', function () {
        control.refresh();
    });

    back.addEventListener('click', function () {
        beyond.back();
    });

}
