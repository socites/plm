function ItemDocument(base, graph) {
    'use strict';

    let fields = [];
    let draft = new FieldsValues();
    let stored = new FieldsValues();

    Object.defineProperty(base, 'document', {'get': () => this});

    Object.defineProperty(graph, 'draftData', {'get': () => (draft.count) ? draft.values : undefined});
    Object.defineProperty(graph, 'storedData', {'get': () => (stored.count) ? stored.values : undefined});

    Object.defineProperty(this, 'unpublished', {
        'get': function () {

            let unpublished = {};
            let specs = base.entity.fields;

            for (let i in fields) {

                let field = fields[i];

                let value = field.memory;
                value = (value === module.NOTSET) ? field.draft : value;

                if (value !== module.NOTSET && value !== field.stored) {
                    let type = specs[field.name].type;
                    unpublished[field.name] = (type === 'graph' && value) ? value.id : value;
                }

            }

            return unpublished;

        }
    });

    Object.defineProperty(graph, 'isUnpublished', {
        'get': function () {

            for (let i in fields) {

                let field = fields[i];

                let value = field.memory;
                value = (value === module.NOTSET) ? field.draft : value;

                if (value !== module.NOTSET && value !== field.stored) {

                    if (!value && field.stored === module.NOTSET) {
                        continue;
                    }
                    return true;

                }

            }

            return false;

        }
    });

    this.toJSON = function () {

        let json = {
            'memory': {},
            'draft': draft.values,
            'stored': stored.values
        };

        // Set the memory values
        let count = 0;
        for (let i in fields) {

            let field = fields[i];
            if (field.memory === module.NOTSET) continue;

            let value = field.memory;
            value = (field.type === 'graph' && value) ? value.id : value;

            json.memory[field.name] = value;
            count++;

        }

        // If not values are set in memory, delete it
        if (!count) delete json.memory;

        // If not values are set in draft or stored, delete it
        if (!draft.count) delete json.draft;
        if (!stored.count) delete json.stored;

        return json;

    };

    this.define = function (define) {

        if (typeof define === 'string') {
            define = [define];
        }

        for (let i in define) {

            let specs = define[i];

            let field = new Field(
                graph,
                base,
                specs,
                {
                    'draft': draft,
                    'stored': stored
                });

            fields.push(field);

        }

        draft.define(define);
        stored.define(define);

    };

    this.set = function (values) {

        if (typeof values !== 'object') {
            throw new Error('Invalid parameter, object was expected');
        }

        // type can be 'memory', 'draft', 'stored'
        for (let type in values) {

            if (['memory', 'draft', 'stored'].indexOf(type) === -1) {
                throw new Error('Invalid field type "memory", "draft" or "stored" was expected');
            }

            // Iterate over the values of type 'memory', 'draft', or 'stored'
            (function (values) {

                for (let i in fields) {

                    let field = fields[i];
                    if (values[field.name]) {
                        field[type] = values[field.name];
                    }

                }

            })(values[type]);

        }

    };

    this.discardMemoryChanges = function () {

        for (let i in fields) {
            let field = fields[i];
            field.memory = module.NOTSET;
        }

        base.events.trigger('change');

    };

    graph.discardMemoryChanges = () => this.discardMemoryChanges();

}
