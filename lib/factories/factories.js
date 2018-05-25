function Factories() {
    "use strict";

    let factories = new Map();

    this.get = function (name) {
        return factories.get(name);
    };

    this.register = function (name, Item) {

        if (!name || !Item) {
            console.log('Factory register parameters:', name, Item);
            throw new Error('Invalid parameters');
        }

        let factory = new ItemFactory(Item);

        if (factories.has(name)) {
            throw new Error('Factory "' + name + '" was already registered');
        }

        factories.set(name, factory);
        Object.defineProperty(this, name, {
            'get': function () {
                return factories.get(name);
            }
        });

        return factories;

    };

}
