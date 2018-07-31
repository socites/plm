function Field(graph, base, specs, values) {
    'use strict';

    let NOTSET = module.NOTSET;

    if (!specs.type) specs.type = 'string';
    if (['number', 'boolean', 'string', 'graph'].indexOf(specs.type) === -1) {
        console.error('Invalid field type "' + specs.type + '"');
        return;
    }

    if (typeof specs.name !== 'string' || !specs.name) {
        console.error('Invalid field name "' + specs.name + '"');
        return;
    }

    // If type is graph, then entityName must be specified,
    // and if entityName is not 'user' nor 'application' then storage is also required
    if (specs.type === 'graph') {

        if (!specs.entityName ||
            (['user', 'application'].indexOf(specs.entityName) !== -1 && !specs.storage)) {

            let message = 'Invalid field specification';
            console.error(message, specs);
            return;

        }

    }

    let memory = NOTSET;
    let draft = NOTSET;
    let stored = NOTSET;

    Object.defineProperty(this, 'name', {
        'get': function () {
            return specs.name;
        }
    });

    Object.defineProperty(this, 'type', {
        'get': function () {
            return specs.type;
        }
    });

    function validateValue(value) {

        if (value === NOTSET) return value;
        if (value === undefined) return;

        if (specs.type === 'graph') {

            if (!value) {
                return;
            }

            if (typeof value === 'string') {
                try {
                    return module.graphs.get(value, graph.language);
                }
                catch (exc) {
                    console.error('Error setting field value', value, specs);
                    return;
                }
            }
            else if (typeof value instanceof Graph) {

                if (value.storage !== specs.storage || value.entityName !== specs.entityName) {
                    console.error('Field "' + specs.name + '" does not allow the entity "' + value.entityName + '"', value);
                    return;
                }
                return value;

            }
            else {
                console.error('A graph was expected on field "' + specs.name + '"', value);
                return;
            }

        }
        else if (specs.type === 'string' && typeof value !== 'string') {
            console.error('A string was expected on field "' + specs.name + '"', value);
            return;
        }
        else if (specs.type === 'number' && typeof value !== 'number') {
            console.error('A number was expected on field "' + specs.name + '"', value);
            return;
        }
        else if (specs.type === 'boolean' && typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
            console.error('A boolean type was expected on field "' + specs.name + '"', value);
            return;
        }

        if (specs.type === 'boolean' && typeof value === 'boolean') {
            value = (!!value).toString();
        }

        return value;

    }

    Object.defineProperty(base, specs.name, {
        'get': function () {
            return this;
        }
    });

    Object.defineProperty(graph, specs.name, {
        'get': function () {

            if (memory === NOTSET) {
                if (draft === NOTSET) {
                    if (stored === NOTSET) {
                        return;
                    }
                    else {
                        return stored;
                    }
                }
                else {
                    return draft;
                }
            }
            else {
                return memory;
            }

        },
        'set': function (value) {
            memory = validateValue(value);
            base.events.trigger('change');
        }
    });

    Object.defineProperty(this, 'memory', {
        'get': function () {
            return memory;
        },
        'set': function (value) {
            memory = validateValue(value);
        }
    });

    Object.defineProperty(this, 'draft', {
        'get': function () {
            return draft;
        },
        'set': function (value) {
            draft = validateValue(value);
            values.draft[specs.name] = draft;
        }
    });

    Object.defineProperty(this, 'stored', {
        'get': function () {
            return stored;
        },
        'set': function (value) {
            stored = validateValue(value);
            values.stored[specs.name] = stored;
        }
    });

}
