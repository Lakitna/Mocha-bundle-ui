describe('Bundling in async code via describe', function() {
    it('bundles with the root level bundle after resolving the promise', function(done) {
        new Promise((resolve, reject) => {
            setTimeout(resolve, 100);
        })
            .then(() => {
                bundle('async describe', function() {
                    const bundleSuite = this;

                    it('adds the second test to the async bundle', function() {
                        expect(bundleSuite.tests.length).to.equal(2);
                    });
                });

                done();
            });
    });
});

bundle('async describe', function() {
    it('adds this test the sync way', function() {});
});


bundle('random bundle', function() {
    it('bundles with the root level bundle after resolving the promise', function(done) {
        new Promise((resolve, reject) => {
            setTimeout(resolve, 100);
        })
            .then(() => {
                bundle('async bundle', function() {
                    const bundleSuite = this;

                    it('adds the second test to the async bundle', function() {
                        expect(bundleSuite.tests.length).to.equal(2);
                    });
                });

                done();
            });
    });
});

bundle('async bundle', function() {
    it('adds this test the sync way', function() {});
});
