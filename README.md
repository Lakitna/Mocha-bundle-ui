# Mocha bundle UI
[![npm version](https://badge.fury.io/js/mocha-bundle-ui.svg)](https://badge.fury.io/js/mocha-bundle-ui)

Add `bundle` to the default Mocha BDD UI. `bundle` allows you to bundle tests across files with a before and after scripts that are executed for every bundle.

This UI was originally made to use with E2E frontend testing frameworks that use Mocha. In this context the UI allows you to separate speed optimizations from your file structure resulting in more flexibility with a minimum runtime.

Fully supports BDD default behaviour including `.skip` and `.only`.

## Design choices

### Bundles work across files
This is the main purpose of the UI. This allows you to separate technical arrangement from your administrative logic.

### Bundles take an object to bundle on
To enable bundling each bundle needs an id. By making this id into an object it can double as input for the `bundle.beforeEach` and `bundle.afterEach` functions. This allows you to customise the before and after scripts to suit each bundles contents.

For maximum flexibility any object will do.

### Bundles only work within their nesting level
Bundling on different nesting levels can be confusing and thus lead to accidental bundling. To keep things clean and clear bundling across nesting levels is not possible.

## Limits
As with everything there are limits, below are the ones identified at this point in time. If you need these limits removed, please feel free to add an issue or a pull request with the solution.

* You can only bundle on the same nesting level, see design choices for details.
* There are no default bundle values.
* Bundles themselves don't support `.skip` and `.only`, but its contents do.
* `bundle.beforeEach` and `bundle.afterEach` only work with Mocha async (requires `done()` to be called).
* `bundle` can only be used in combination with the basic `BDD` UI.

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
Below are some basic examples of using `bundle` in combination with the default `BDD` UI.

### Minimal
```javascript
bundle({ foo: 'bar' }, function() {
    describe('An amazing test description', function() {
        it('is an amazing', function() {
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
```

### Bundling
This behaviour also works across multiple files, but only on the same nesting level.

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


