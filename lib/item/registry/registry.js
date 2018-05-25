function Registry() {

    let registry = new Map();

    this.add = function (name, Item) {
        module.factories.register(name, Item);

    };

}
