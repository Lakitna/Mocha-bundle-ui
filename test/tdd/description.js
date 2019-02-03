const niceTitle = 'Nice title (bundle)';


for (let i=0; i<3; i++) {
    bundle({title: 'nice'}, function() {
        if (i == 2) {
            this.title = niceTitle;
        }

        test('has a nice title', function(done) {
            expect(this.test.parent.title).to.equal(niceTitle);
            done();
        });
    });
}

bundle({title: 'boring', mood: 'bored'}, function() {
    test('has a boring title', function(done) {
        expect(this.test.parent.title)
            .to.equal('Bundle with parameters: title = boring & mood = bored');
        done();
    });
});
