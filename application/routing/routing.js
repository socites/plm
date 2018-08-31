beyond.bind('routing', function (pathname, done) {

    if (pathname !== '/') {
        done();
        return;
    }

    done({'pathname': '/students'});

});
