const count = {
    before: 0,
    after: 0,
};


bundle.beforeEach(function(params, done) {
    count.before++;
    expect(params).to.be.an('object');
    done();
});


bundle.afterEach(function(params, done) {
    count.after++;
    expect(params).to.be.an('object');
    done();
});


after(function() {
    expect(count.before).to.be.above(1);
    expect(count.before).to.equal(count.after);
});
