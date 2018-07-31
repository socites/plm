function ItemRegistry(Item, specs) {
    'use strict';

    let events = new Events({'bind': this});

    if (!Item || typeof specs !== 'object' || !specs.module ||
        typeof specs.actions !== 'object' || !specs.actions.data || !specs.actions.tu) {

        throw new Error('Invalid item registration parameters');
    }

    let factory = new ItemsFactory(this, events);
    Object.defineProperty(this, 'factory', {'get': () => factory});

    Object.defineProperty(this, 'Item', {'get': () => Item});
    Object.defineProperty(this, 'module', {'get': () => specs.module});
    Object.defineProperty(this, 'actions', {'get': () => specs.actions});
    Object.defineProperty(this, 'immutable', {'get': () => !!specs.immutable});
    Object.defineProperty(this, 'auth', {'get': () => !!specs.auth});
    Object.defineProperty(this, 'cache', {'get': () => specs.cache});

    // The batch for fetching items
    // Each entity has its own batch for fetching items
    let batcher = new ItemsBatcher(this);
    Object.defineProperty(this, 'batcher', {'get': () => batcher});

}
