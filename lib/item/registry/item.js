function ItemRegistry(name, module, paths) {

    Object.defineProperty(this, 'name', {
        'get': function () {
            return name;
        }
    });
    Object.defineProperty(this, 'module', {
        'get': function () {
            return module;
        }
    });
    Object.defineProperty(this, 'paths', {
        'get': function () {
            return paths;
        }
    });

    let fetchBatch = new ItemBatchFetch();
    Object.defineProperty(this, 'fetchBatch', {
        'get': function () {
            return fetchBatch;
        }
    });

}
