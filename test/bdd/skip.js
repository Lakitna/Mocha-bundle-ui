
bundle({behaviour: 'default'}, function() {
    describe.skip('A skipped suite', function() {
        it('should be skipped', function() {
            expect(true, 'This test should have been skipped').to.be.false;
        });
    });

    describe('A normal suite', function() {
        it.skip('is skipped', function() {
            expect(true, 'This test should have been skipped').to.be.false;
        });
    });
});

bundle.skip({behaviour: 'skip'}, function() {
    it('skips', function() {
        expect(true).to.be.false;
    });
});
