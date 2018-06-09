function Item(item, id) {
    "use strict";

    Object.defineProperty(item, 'id', {
        'get': function () {
            return id;
        }
    });

    // Get collection base from the factory
    let registry = module.registries.items.get(item.constructor);
    let base = registry.factory.get(id);

    // Expose bind and unbind for handling events
    new ItemEvents(item, base);

    Object.defineProperty(item, 'loaded', {
        'get': function () {
            return base.loaded;
        }
    });
    Object.defineProperty(item, 'updating', {
        'get': function () {
            return base.updating;
        }
    });
    Object.defineProperty(item, 'fetching', {
        'get': function () {
            return base.fetching;
        }
    });
    Object.defineProperty(item, 'fetched', {
        'get': function () {
            return base.fetched;
        }
    });
    Object.defineProperty(item, 'publishing', {
        'get': function () {
            return base.publishing;
        }
    });
    Object.defineProperty(item, 'published', {
        'get': function () {
            return base.published;
        }
    });


    Object.defineProperty(item, 'ERRORS', {
        'get': function () {
            return base.ERRORS;
        }
    });
    Object.defineProperty(item, 'error', {
        'get': function () {
            return base.error;
        }
    });

    Object.defineProperty(this, 'unpublished', {
        'get': function () {
            return base.unpublished;
        }
    });

    Object.defineProperty(this, 'isUnpublished', {
        'get': function () {
            return base.isUnpublished;
        }
    });

    // Expose updated object
    item.updated = base.updated;

    // Expose fetch and load methods
    item.fetch = base.fetch;
    item.update = base.update;
    item.toJSON = base.toJSON;

    // item.load can be overwritten
    item.load = base.load;
    this.load = base.load;

    // Expose the publish method
    item.publish = base.publish;

    function expose(self, field) {
        Object.defineProperty(self, field, {
            'get': function () {
                return base.data[field];
            },
            'set': function (value) {
                base.data[field] = value;
            }
        });
    }

    for (let field of registry.fields) {
        expose(this, field)
    }

}
