module.exports = require('async')(function* (resolve, reject, params, context) {
    "use strict";

    function result() {
        return {
            'entities': [
                {
                    'id': '1',
                    'name': 'application',
                    'versions': {
                        60: {
                            'fields': [
                                'entity',
                                'name',
                                'category',
                                'description'
                            ]
                        }
                    }
                },
                {
                    'id': '2',
                    'name': 'user',
                    'versions': {
                        30: {
                            'fields': [
                                'entity',
                                'name',
                                'lastname',
                                'about',
                                'birthDate',
                                'country'
                            ]
                        }
                    }
                },
                {
                    'id': '20',
                    'storage': 'socites',
                    'name': 'post',
                    'versions': {
                        50: {
                            'fields': [
                                'entity',
                                'title',
                                'description',
                                'tags'
                            ]
                        }
                    }
                },
                {
                    'id': '22',
                    'storage': 'socites',
                    'name': 'comments',
                    'containers': {'20': 'comments'},
                    'versions': {
                        52: {
                            'fields': [
                                'entity',
                                'title',
                                'description',
                                'tags'
                            ]
                        }
                    }
                }
            ],
            'relations': []
        };
    }

    setTimeout(function () {
        resolve(result());
    }, 1000);

});
