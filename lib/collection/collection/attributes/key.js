function AttributesKey(map) {

    // Generate the key. The key is used to uniquely identify the collection base.
    this.generate = function (except) {

        value = '';
        [...map.keys()].sort().forEach(function (name) {

            if (name === except) {
                return;
            }

            let attribute = map.get(name);

            // If the value of the attribute is an item, take its instanceId, because the id may not be set
            // when the item is recently created.
            attribute = (typeof attribute === 'object') ? attribute.instanceId : attribute;

            value += name + ':' + attribute;

        });

        return value;

    };

    // The key is the string generated from the list of the attributes,
    // by alphabetically sorting their keys, and including their corresponding values
    let value;
    Object.defineProperty(this, 'value', {
        'get': function () {

            if (!value) {
                this.generate();
            }

            return value;

        }
    });

    /**
     * Generate the key excluding a specific attribute.
     * It is required for the batcher factory, to identify the batcher excluding its key.
     * @param attribute {string} The attribute to be excluded.
     */
    this.except = function (attribute) {
        return this.generate(attribute);
    };

}
