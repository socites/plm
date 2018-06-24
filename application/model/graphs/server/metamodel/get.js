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
                    'id': '22',
                    'storage': 'socites',
                    'name': 'comments',
                    'versions': {
                        52: {
                            'fields': [
                                'title',
                                'description',
                                'tags'
                            ]
                        }
                    }
                },
                {
                    'id': '23',
                    'storage': 'socites',
                    'name': 'post',
                    'versions': {
                        53: {
                            'fields': [
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
