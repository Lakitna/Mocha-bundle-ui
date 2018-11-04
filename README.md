# Mocha bundle UI
[![npm version](https://badge.fury.io/js/mocha-bundle-ui.svg)](https://badge.fury.io/js/mocha-bundle-ui)

Add `bundle` to the default Mocha BDD UI. `bundle` allows you to bundle tests across files with a before and after scripts that are executed for every bundle.

This UI was originally made to use with E2E frontend testing frameworks that use Mocha. In this context the UI allows you to separate speed optimizations from your file structure resulting in more flexibility while maintaining speed.

Fully supports BDD default behaviour including `.skip` and `.only`.

## Limits
As with everything there are limits, below are the ones identified at this point in time. If you need these limits removed, please feel free to add an issue or a pull request with the solution.

* A bundle within a describe block will still be placed in the root suite and not in the describe block.
* Nested bundles will all be placed in the root suite and thus will lose their nesting.
* There are no default bundle values.
* Bundles themselves don't support `.skip` and `.only`, but its contents do.
* `bundle.beforeEach` and `bundle.afterEach` only work with Mocha async (requires `done()` to be called).

## Installation

```shell
npm install mocha-bundle-ui
```

Then specify the UI by calling mocha with the `--ui` flag

```shell
mocha --ui mocha-bundle-ui
```

Or add the following line to `mocha.opts`

```shell
--ui mocha-bundle-ui
```


## Examples
Below are some basic examples of using `bundle` in combination with the default BDD UI.

### Minimal
```javascript
bundle({ foo: 'bar' }, function() {
    describe('An amazing test description', function() {
        it('is an amazing', function() {
            // ...
        });

        it('is very amazing', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle with parameters: foo = bar
    An amazing test description
      ✓ is amazing
      ✓ is very amazing
```

### Bundling
This behaviour also works across multiple files.

```javascript
bundle({ foo: 'bar' }, function() {
    describe('An amazing test description', function() {
        it('is amazing', function() {
            // ...
        });
    });
});

bundle({ foo: 'bar' }, function() {
    describe('A second amazing test description', function() {
        it('is also amazing', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle with parameters: foo = bar
    An amazing test description
      ✓ is amazing
    A second amazing test description
      ✓ is also amazing
```

### Before and after each bundle
`bundle.beforeEach` and `bundle.afterEach` only have to be set once and are called before and after the execution of every bundle.

Custom behaviour based on a specific bundle should be accomplished by using the bundle parameters.

```javascript
bundle.beforeEach(function(parameters, done) {
    // Do some setup using the parameters as input
    console.log('before');
    console.log(parameters);

    done(); // Done must be called, see mocha-bundle-ui limits
});

bundle.afterEach(function(parameters, done) {
    // Do some teardown using the parameters as input
    console.log('after');
    console.log(parameters);

    done(); // Done must be called, see mocha-bundle-ui limits
});

bundle({ foo: 'bar' }, function() {
    describe('An amazing test description', function() {
        it('is amazing', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle with parameters: foo = bar
before
{ foo: 'bar' }
    An amazing test description
      ✓ is amazing
after
{ foo: 'bar' }
```


