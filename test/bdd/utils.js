const utils = require('../../include/utils');


describe('Utility functions', function() {
    describe('objectEquals', function() {
        describe('recursive', function() {
            it('does not match objects with a change deeper in the object', function() {
                const a = {
                    foo: {
                        bar: {value: 12},
                    },
                };
                const b = {
                    foo: {
                        bar: {value: 1},
                    },
                };

                expect(utils.objectEquals(a, b)).to.be.false;
            });

            it('matches equal deep objects', function() {
                const a = {
                    foo: {
                        bar: {value: 12},
                    },
                };
                const b = {
                    foo: {
                        bar: {value: 12},
                    },
                };

                expect(utils.objectEquals(a, b)).to.be.true;
            });
        });

        it('returns false when an object is null', function() {
            const a = null;
            const b = {
                foo: 'bar',
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it('returns false when it contains arrays of different lengths', function() {
            const a = [0];
            const b = [0, 1];

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it('returns false for different dates', function() {
            const a = new Date(10);
            const b = new Date(8);

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it('should return true for equal simple JSON compatible objects', function() {
            const a = {
                foo: 'bar',
            };
            const b = {
                foo: 'bar',
            };

            expect(utils.objectEquals(a, b)).to.be.true;
        });

        it('should return true for equal larger JSON compatible objects', function() {
            const a = {
                foo: 'bar',
                lorum: 'ipsum',
                dolor: 'sit',
                amet: 123,
                conscuer: 'ipsum',
            };
            const b = {
                foo: 'bar',
                lorum: 'ipsum',
                dolor: 'sit',
                amet: 123,
                conscuer: 'ipsum',
            };

            expect(utils.objectEquals(a, b)).to.be.true;
        });

        it('should return false for equal objects containing a function', function() {
            const a = {
                foo: 'bar',
                func: function() {},
            };
            const b = {
                foo: 'bar',
                func: function() {},
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it('should return false for objects with different lengths', function() {
            const a = {
                foo: 'bar',
            };
            const b = {
                foo: 'bar',
                lorum: 1234,
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });

        it('should return false for different objects', function() {
            const a = {
                foo: 'bar',
            };
            const b = {
                bar: 'foo',
            };

            expect(utils.objectEquals(a, b)).to.be.false;
        });
    });
});
