/* eslint sonarjs/no-identical-functions: "off" */
/* eslint no-invalid-this: "off" */

const loopLength = 2;
const loopArray = [];


for (let i=0; i<loopLength; i++) {
    loopArray.push(i);

    bundle({loop: 'for'}, function() {
        const bundleSuite = this;

        suite(`Loop iteration ${i}`, function() {
            test(`should have bundled`, function() {
                expect(bundleSuite.suites.length).to.equal(loopLength);
            });
        });
    });
}

loopArray.forEach((i) => {
    bundle({loop: 'ES6 foreach'}, function() {
        const bundleSuite = this;

        suite(`Loop iteration ${i}`, function() {
            test(`should have bundled`, function() {
                expect(bundleSuite.suites.length).to.equal(loopLength);
            });
        });
    });
});


loopArray.forEach(function(i) {
    bundle({loop: 'foreach'}, function() {
        const bundleSuite = this;

        suite(`Loop iteration ${i}`, function() {
            test(`should have bundled`, function() {
                expect(bundleSuite.suites.length).to.equal(loopLength);
            });
        });
    });
});


