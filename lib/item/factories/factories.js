function Factories() {
    "use strict";

    let factories = new Map();

    this.get = function (Item) {
        return factories.get(Item);
    };

    this.register = function (name) {

        if (factories.has(name)) {
            throw new Error('Factory "${name}" was already registered');
        }

        let factory = new ItemFactory();
        factories.set(Item, factory);

        return factory;

    };

}
