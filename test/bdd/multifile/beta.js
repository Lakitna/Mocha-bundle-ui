

bundle({multi: 'across files'}, function() {
    const bundleSuite = this;

    describe('Tests from file `beta.js`', function() {
        it('should be a part of a bundle with multiple tests', function() {
            expect(bundleSuite.suites.length).to.be.above(1);
        });
    });
});
