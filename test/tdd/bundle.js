/* eslint sonarjs/no-identical-functions: "off" */


bundle({nesting: 'base'}, function() {
    const bundleSuite = this;

    suite('This bundle should be a child of the root suite', function() {
        test('this.parent is the root suite', function() {
            expect(bundleSuite.parent.root).to.be.true;
        });
    });

    bundle({nesting: 'One'}, function() {
        const bundleSuite = this;

        suite('A nested bundle should be a child of the first bundle', function() {
            test('this.parent is another bundle', function() {
                expect(bundleSuite.parent.root).to.be.false;
                expect(bundleSuite.parent.params).to.eql({nesting: 'base'});
            });
        });
    });

    bundle({nesting: 'One'}, function() {
        const bundleSuite = this;

        suite('A nested bundle with the same parameters should be combined into one', function() {
            test('has more than one suite', function() {
                expect(bundleSuite.suites.length).to.be.above(1);
            });
        });
    });

    bundle({nesting: 'Two'}, function() {
        const bundleSuite = this;

        suite('A second nested bundle should be a sibling of the first nested bundle', function() {
            test('its sibling is the bundle defined on the same level', function() {
                bundleSuite.parent.suites.forEach((bun) => {
                    if (typeof bun.params !== 'undefined') {
                        expect(JSON.stringify(bun.params)).to.be.oneOf([
                            JSON.stringify(bundleSuite.params),
                            JSON.stringify({nesting: 'One'}),
                        ]);
                    }
                });
            });
        });
    });
});


suite('A random nesting level', function() {
    bundle({nesting: 'across levels'}, function() {
        const bundleSuite = this;

        suite('Multiple nested bundles with the same parameters on different nesting levels',
            function() {
                test('hasn\'t bundles with a bundle on another nesting level', function() {
                    expect(bundleSuite.suites.length).to.be.equal(1);
                });
            });
    });
});


bundle({nesting: 'across levels'}, function() {
    const bundleSuite = this;

    suite('Multiple nested bundles with the same parameters on different nesting levels',
        function() {
            test('hasn\'t bundles with a bundle on another nesting level', function() {
                expect(bundleSuite.suites.length).to.be.equal(1);
            });
        });
});
