bundle({behaviour: 'default'}, function() {
    suite.skip('A skipped suite', function() {
        test('should be skipped', function() {
            expect(true, 'This test should have been skipped').to.be.false;
        });
    });

    suite('A normal suite', function() {
        test.skip('is skipped', function() {
            expect(true, 'This test should have been skipped').to.be.false;
        });
    });
});
