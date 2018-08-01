function CollectionRegistry(Collection, Item, specs) {
    'use strict';

    let items = new ItemsManager(Collection, Item);
    Object.defineProperty(this, 'items', {'get': () => items});

    let factory = new CollectionsFactory(this);
    Object.defineProperty(this, 'factory', {'get': () => factory});

    Object.defineProperty(this, 'Collection', {'get': () => Collection});
    Object.defineProperty(this, 'Item', {'get': () => Item});
    Object.defineProperty(this, 'module', {'get': () => specs.module});
    Object.defineProperty(this, 'actions', {'get': () => specs.actions});
    Object.defineProperty(this, 'auth', {'get': () => !!specs.auth});

    let cache = specs.cache;
    if (['string', 'object', 'undefined'].indexOf(typeof cache) === -1) {
        console.warn('Invalid collection cache registry', Collection, specs);
        cache = undefined;
    }
    cache = (typeof cache === 'string') ? cache = {'key': cache} : cache;
    if (cache && (typeof cache.key !== 'string' || !cache.key)) {
        console.warn('Invalid collection cache key', Collection, specs);
        cache = undefined;
    }

    Object.defineProperty(this, 'cache', {'get': () => cache});

    if (specs.auth) {
        new CollectionsAuthManager(factory);
    }

    this.unshift = function (item) {

        if (typeof specs.unshift !== 'function') {
            return item.constructor === Item;
        }

        return !!(specs.unshift(item));

    };

}
