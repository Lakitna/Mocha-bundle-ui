


bundle({ multi: "across files" }, function() {
    let bundleSuite = this;

    suite("Tests from file `beta.js`", function() {
        test("should be a part of a bundle with multiple tests", function() {
            expect(bundleSuite.suites.length).to.be.above(1);
        });
    });
});