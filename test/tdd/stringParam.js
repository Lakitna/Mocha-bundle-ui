bundle('String instead of object', function() {
    const bundleSuite = this;

    suite('Bundle with a string instead of parameter object', function() {
        test('bundle.title is correct', function() {
            expect(bundleSuite.title)
                .to.equal('Bundle: String instead of object');
        });
    });
});


bundle('String instead of object', function() {
    const bundleSuite = this;

    suite('Bundle with a string instead of parameter object', function() {
        test('bundles properly', function() {
            expect(bundleSuite.suites).to.have.lengthOf(2);
        });
    });
});

suite('Bundles take an object or a string as parameters', function() {
    test('throws an error when a number is given', function() {
        const fn = function() {
            bundle(123, function() {});
        };
        const error = 'Bundle parameters are of invalid type \'number\'. '
            + 'Expected an Object or a string.';

        expect(fn).to.throw(error);
    });
});
