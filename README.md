# Mocha bundle UI
Add bundle to the default Mocha BDD UI. Bundle allows you to bundle tests across files with a shared before and after script.

Fully supports BDD default behaviour including `.skip` and `.only`.

## Limits
As with everything there are limits, below are the ones identified at this point. If you need these limits removed, please feel free to contibrute.

* A bundle within a describe block will still be placed in the root suite
* Nested bundles will all be placed in the root suite
* There are no default bundle values
* Bundles themselves don't support `.skip` and `.only`
* `bundle.beforeEach` and `bundle.afterEach` only work with Mocha async (requires `done()` to be called)

## Installation

```shell
npm install mocha-bundle-ui
```

Then specify the UI by calling mocha like so

```shell
mocha --ui mocha-bundle-ui
```

Or add the following line to `mocha.opts`

```
--ui mocha-bundle-ui
```


## Examples

### Minimal
```javascript
bundle({ foo: 'bar' }, function() {
    describe('An amazing test context description', function() {
        it('An amazing test', function() {
            // ...
        });

        it('Another amazing test', function() {
            // ...
        });
    });
});
```

results in

```
  Bundle with parameters: foo = bar
    An amazing test context description
      ✓ An amazing test
      ✓ Another amazing test
```

### Bundling
This behaviour also works across files.

```javascript
bundle({ foo: 'bar' }, function() {
    describe('An amazing test context description', function() {
        it('An amazing test', function() {
            // ...
        });
    });
});

bundle({ foo: 'bar' }, function() {
    describe('A second amazing test context description', function() {
        it('A second amazing test', function() {
            // ...
        });
    });
});
```

results in

```
  Bundle with parameters: foo = bar
    An amazing test context description
      ✓ An amazing test
      ✓ Another amazing test
    A second amazing test context description
      ✓ A second amazing test
```

### Before and after each bundle
`bundle.beforeEach` and `bundle.afterEach` only have to be set once and are called before and after ech bundle is executed.

Custom behaviour based on a specific bundle should be accomplished by using the bundle parameters.

```javascript
bundle.beforeEach(function(parameters, done) {
    // Do some setup using the parameters as input
    console.log('before');
    console.log(parameters);

    done(); // Done must be called, see mocha-bundle-ui limits
});

bundle.afterEach(function(parameters, done) {
    // Do some setup using the parameters as input
    console.log('after');
    console.log(parameters);

    done(); // Done must be called, see mocha-bundle-ui limits
});

bundle({ foo: 'bar' }, function() {
    describe('An amazing test context description', function() {
        it('An amazing test', function() {
            // ...
        });
    });
});
```

results in

```
  Bundle with parameters: foo = bar
before
{ foo: 'bar' }
    An amazing test context description
      ✓ An amazing test
after
{ foo: 'bar' }
```


