function Factories() {
    "use strict";

    let factories = new Map();

    this.get = function (Item) {
        return factories.get(Item);
    };

    this.register = function (Item) {

        let factory = new ItemFactory(Item);

        if (factories.has(Item)) {
            throw new Error('Factory was already registered');
        }

        factories.set(Item, factory);
        return factory;

    };

}
