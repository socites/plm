function DataField(name) {

    let memory, draft, published;

    Object.defineProperty(this, 'memory', {
        'get': function () {
            return memory;
        },
        'set': function (value) {
            memory = value;
        }
    });

    Object.defineProperty(this, 'draft', {
        'get': function () {
            return draft;
        },
        'set': function (value) {
            draft = value;
        }
    });

    Object.defineProperty(this, 'published', {
        'get': function () {
            return published;
        },
        'set': function (value) {
            published = value;
        }
    });

}
