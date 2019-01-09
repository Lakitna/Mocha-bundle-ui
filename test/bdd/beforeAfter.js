const count = {
    before: 0,
    after: 0,
};


bundle.beforeEach(function(done) {
    count.before++;
    expect(this.parameters).to.be.an('object');
    done();
});


bundle.afterEach(function(done) {
    count.after++;
    expect(this.parameters).to.be.an('object');
    done();
});


after(function() {
    expect(count.before).to.be.above(1);
    expect(count.before).to.equal(count.after);
});
