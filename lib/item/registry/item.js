function ItemRegistry(Item, specs) {
    "use strict";

    let events = new Events({'bind': this});

    if (!Item || typeof specs !== 'object' || !specs.module ||
        typeof specs.actions !== 'object' || !specs.actions.data || !specs.actions.tu) {

        throw new Error('Invalid item registration parameters');
    }

    let factory = new ItemsFactory(this, events);
    Object.defineProperty(this, 'factory', {
        'get': function () {
            return factory;
        }
    });

    Object.defineProperty(this, 'Item', {
        'get': function () {
            return Item;
        }
    });
    Object.defineProperty(this, 'module', {
        'get': function () {
            return specs.module;
        }
    });
    Object.defineProperty(this, 'actions', {
        'get': function () {
            return specs.actions;
        }
    });
    Object.defineProperty(this, 'fields', {
        'get': function () {
            return specs.fields;
        }
    });
    Object.defineProperty(this, 'immutable', {
        'get': function () {
            return !!specs.immutable;
        }
    });
    Object.defineProperty(this, 'auth', {
        'get': function () {
            return !!specs.auth;
        }
    });
    Object.defineProperty(this, 'cache', {
        'get': function () {
            return specs.cache;
        }
    });

    if (specs.auth) {
        new ItemsAuthManager(factory);
    }

    // The batch for fetching items
    // Each entity has its own batch for fetching items
    let batcher = new Batcher(this);
    Object.defineProperty(this, 'batcher', {
        'get': function () {
            return batcher;
        }
    });

}
