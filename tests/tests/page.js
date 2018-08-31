function Page() {

    this.prepare = function (done) {

        mocha.setup('bdd');

        require(['application/tests/code'], function () {
            mocha.run();
            done();
        });

    };

}
