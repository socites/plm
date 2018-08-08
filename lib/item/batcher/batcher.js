function ItemsBatcher(registry) {

    let data = new Dispatcher(registry);
    let tu = new Dispatcher(registry, 'timeUpdated');

    this.data = (id, session) => data.dispatch(id, session);
    this.tu = (id, session) => tu.dispatch(id, session);

}
