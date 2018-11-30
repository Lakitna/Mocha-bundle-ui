

bundle({multi: 'across files'}, function() {
    const bundleSuite = this;

    suite('Tests from file `alpha.js`', function() {
        test('should be a part of a bundle with multiple tests', function() {
            expect(bundleSuite.suites.length).to.be.above(1);
        });
    });
});
