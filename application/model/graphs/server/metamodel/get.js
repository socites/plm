module.exports = require('async')(function* (resolve) {
    "use strict";

    function result() {
        return {
            'entities': [
                {
                    'id': '1',
                    'name': 'application',
                    'versions': {
                        1: {
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
                        2: {
                            'fields': [
                                'entity',
                                'name',
                                'last_name',
                                'about',
                                'birth_date',
                                'country'
                            ]
                        }
                    }
                },
                {
                    'id': '3',
                    'storage': 'social-graphs',
                    'name': 'post',
                    'versions': {
                        3: {
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
                    'id': '4',
                    'storage': 'social-graphs',
                    'name': 'comments',
                    'containers': {'3': 'comments'},
                    'versions': {
                        4: {
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
            'relations': [
                {
                    'id': '1',
                    'storage': 'social-graphs',
                    'name': 'follow',
                    'from': {
                        'entity': '2',
                        'name': 'following'
                    },
                    'to': {
                        'entity': '2',
                        'name': 'followers'
                    },
                    'versions': {
                        1: {
                            'fields': [
                                'is'
                            ]
                        }
                    }
                }
            ]
        };
    }

    setTimeout(function () {
        resolve(result());
    }, 1000);

});
