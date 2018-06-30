/**
 * The getters wrapper for the relations of the graph.
 *
 * @param collection {object} The relations collection.
 * @param direction {string} 'from' or 'to'.
 * @constructor
 */
function GraphRelationsGetters(collection, direction) {

    let getters = {};

    function expose(property) {

        Object.defineProperty(getters, property, {
            'get': function () {
                return collection[property];
            }
        });

    }

    expose('fetching');
    expose('fetched');

    Object.defineProperty(getters, 'counter', {
        'get': function () {
            return collection.getters.counter;
        }
    });

    Object.defineProperty(getters, 'items', {
        'get': function () {

            let items = [];

            collection.items.map(function (relation) {

                let getters = new GraphRelationGetters(relation, direction);
                items.push(getters.value)

            });

            return items;

        }
    });

    Object.defineProperty(this, 'value', {
        'get': function () {
            return getters;
        }
    });

}
