function Toolbar($container) {

    let control = $container.children('student-edit').get(0);
    let spinner = $container.find('paper-toolbar paper-spinner');

    function update() {
        spinner.active = !!control.processing;
    }

    control.addEventListener('processing-update', update);

}
