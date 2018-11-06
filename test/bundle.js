

bundle({ alpha: 'base' }, function() {
    let bundleSuite = this;

    describe("A bundle should be a child of the root suite", function() {
        it("its parent is the root suite", function() {
            expect(bundleSuite.parent.root).to.be.true;
        });
    });

    bundle({ alpha: 'nestedOne' }, function() {
        let bundleSuite = this;

        describe("A nested bundle should be a child of the first bundle", function() {
            it('its parent is the bundle', function() {
                expect(bundleSuite.parent.root).to.be.false;
                expect(bundleSuite.parent.params).to.eql({ alpha: 'base' });
            });
        });
    });

    bundle({ alpha: 'nestedTwo' }, function() {
        let bundleSuite = this;

        describe("A second nested bundle should be a sibling of the first nested bundle", function() {
            it('its sibling is the bundle defined on the same level', function() {
                bundleSuite.parent.suites.forEach(bun => {
                    if (typeof bun.params !== 'undefined') {
                        expect(JSON.stringify(bun.params)).to.be.oneOf([
                            JSON.stringify(bundleSuite.params),
                            JSON.stringify({ alpha: 'nestedOne' })
                        ]);
                    }
                });
            });
        });
    });
});