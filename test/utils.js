let utils = require("./../include/utils");


describe("Utility functions", function () {
    describe("objectEquals", function () {
        it("should return true for equal simple JSON compatible objects", function () {
            let a = {
                foo: 'bar'
            };
            let b = {
                foo: 'bar'
            };

            expect(utils.objectEquals(a, b)).to.be.true;
        });

        it("should return true for equal larger JSON compatible objects", function () {
            let a = {
                foo: 'bar',
                lorum: 'ipsum',
                dolor: 'sit',
                amet: 123,
                conscuer: 'ipsum',
            };
            let b = {
                foo: 'bar',
                lorum: 'ipsum',
                dolor: 'sit',
                amet: 123,
                conscuer: 'ipsum',
            };

            expect(utils.objectEquals(a, b)).to.be.true;
        });

        it("should return false for equal objects containing a function", function () {
            let a = {
                foo: 'bar',
                func: function() {}
            };
            let b = {
                foo: 'bar',
                func: function() {}
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it("should return false for objects with different lengths", function () {
            let a = {
                foo: 'bar',
            };
            let b = {
                foo: 'bar',
                lorum: 1234
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it("should return false for different objects", function () {
            let a = {
                foo: 'bar',
            };
            let b = {
                bar: 'foo',
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });
    });
});