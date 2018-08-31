describe('Test', function () {

    let plm;
    before(function (done) {
        done();
        return;
        require(['libraries/plm/v1/main/code/spa'], function (_plm) {
            plm = _plm;
            done();
        });
    });

    it('run a test', function () {
        expect(2).to.equal(2);
    });


});
