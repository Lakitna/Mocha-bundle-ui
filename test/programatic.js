

let loopLength = 2;
let loopArray = [];


for(let i=0; i<loopLength; i++) {
    loopArray.push(i);

    bundle({ loop: "for" }, function() {
        let bundleSuite = this;

        describe("Loop iteration " + i, function() {
            it("should have bundled", function() {
                expect(bundleSuite.suites.length).to.equal(loopLength);
            });
        });
    });
}

loopArray.forEach((val, i) => {
    bundle({ loop: "ES6 foreach" }, function() {
        let bundleSuite = this;

        describe("Loop iteration " + i, function() {
            it("should have bundled", function() {
                expect(bundleSuite.suites.length).to.equal(loopLength);
            });
        });
    });
});


loopArray.forEach(function(val, i) {
    bundle({ loop: "foreach" }, function() {
        let bundleSuite = this;

        describe("Loop iteration " + i, function() {
            it("should have bundled", function() {
                expect(bundleSuite.suites.length).to.equal(loopLength);
            });
        });
    });
});


