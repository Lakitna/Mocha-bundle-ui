const parametersA = {
    'colors': [{
        'color': 'black',
        'category': 'hue',
        'type': 'primary',
        'code': {
            'rgba': [255, 255, 255, 1],
            'hex': '#000',
        },
    },
    {
        'color': 'white',
        'category': 'value',
        'code': {
            'rgba': [0, 0, 0, 1],
            'hex': '#FFF',
        },
    }],
};

const parametersB = {
    'colors': [{
        'color': 'black',
        'category': 'hue',
        'type': 'primary',
        'code': {
            'rgba': [0, 255, 255, 1],
            'hex': '#000',
        },
    },
    {
        'color': 'white',
        'category': 'value',
        'code': {
            'rgba': [0, 0, 0, 1],
            'hex': '#FFF',
        },
    }],
};

bundle(parametersA, function() {
    it('has not bundled', function() {
        expect(this.test.parent.tests)
            .to.have.length(1);
    });
});

bundle(parametersB, function() {
    it('has not bundled', function() {
        expect(this.test.parent.tests)
            .to.have.length(1);
    });
});
