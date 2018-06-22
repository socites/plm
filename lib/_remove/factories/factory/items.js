/**
 * The items factory is actually composed by many factories
 * Each class (by instance, Student) has its own factory of items
 * @constructor
 */
function ItemsFactory() {
    "use strict";

    let factories = new Map();

    this.get = function (name, id) {

        if (!factories.has(name)) {
            throw new Error('Factory "${name}" is not registered');
        }

        let factory = factories.get(name);
        return factory.get(id);

    };

    this.register = function (name) {

        if (factories.has(name)) {
            throw new Error('Factory "${name}" was already registered');
        }

        let factory = new EntityFactory();
        factories.set(Proxy, factory);

        return factory;

    };

}
