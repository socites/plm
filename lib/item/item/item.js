function Item(item, id) {

    let events = new Events({'bind': item});

    let plm = module.plm;
    let base = plm.factory.get('students', id);

    function triggerChange() {
        events.trigger('change');
    }

    base.bind('change', triggerChange);

    let destroyed;
    Object.defineProperty(item, 'destroyed', {
        'get': function () {
            return !!destroyed;
        }
    });

    this.destroy = function () {
        events.unbind();
        base.unbind();
        destroyed = true;
        events.trigger('destroyed');
        events = base = undefined;
    };

}
