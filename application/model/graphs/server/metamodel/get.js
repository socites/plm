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
                    'id': '23',
                    'storage': 'contents',
                    'name': 'post',
                    'versions': {
                        52: {
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
