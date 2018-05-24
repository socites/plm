define(function () {
    "use strict";

    var factories = new Factories();
    module.factories = factories;

    return {
        'Collection': CollectionBase,
        'Item': ItemBase,
        'factories': factories
    };

});
