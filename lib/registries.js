function Registries() {

    let items = new ItemsRegistry();
    Object.defineProperty(this, 'items', {'get': () => items});

    let collections = new CollectionsRegistry();
    Object.defineProperty(this, 'collections', {'get': () => collections});

}
