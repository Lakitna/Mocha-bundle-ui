bundle('String instead of object', function() {
    const bundleSuite = this;

    describe('Bundle with a string instead of parameter object', function() {
        it('bundle.title is correct', function() {
            expect(bundleSuite.title)
                .to.equal('Bundle: String instead of object');
        });
    });
});


bundle('String instead of object', function() {
    const bundleSuite = this;

    describe('Bundle with a string instead of parameter object', function() {
        it('bundles properly', function() {
            // console.log(bundleSuite);
            expect(bundleSuite.suites).to.have.lengthOf(2);
        });
    });
});
