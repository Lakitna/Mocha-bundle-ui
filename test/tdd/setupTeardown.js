const count = {
    before: 0,
    after: 0,
};


bundle.setup(function(done) {
    count.before++;
    expect(this.parameters).to.be.an('object');
    done();
});


bundle.teardown(function(done) {
    count.after++;
    expect(this.parameters).to.be.an('object');
    done();
});


suiteTeardown(function() {
    expect(count.before).to.be.above(1);
    expect(count.before).to.equal(count.after);
});
