# Mocha bundle UI
[![GitHub license](https://img.shields.io/github/license/Lakitna/Mocha-bundle-ui.svg)](https://github.com/Lakitna/Mocha-bundle-ui/blob/master/LICENSE)
![Node version](https://img.shields.io/badge/Node-%3E%3D%207.6-brightgreen.svg)
[![npm version](https://badge.fury.io/js/mocha-bundle-ui.svg)](https://badge.fury.io/js/mocha-bundle-ui)
[![Coverage Status](https://coveralls.io/repos/github/Lakitna/Mocha-bundle-ui/badge.svg?branch=master)](https://coveralls.io/github/Lakitna/Mocha-bundle-ui?branch=master)

Add `bundle` to [another UI](#supported-uis). `bundle` allows you to bundle tests across files with a before and after scripts that are executed for every bundle.

This UI was originally made to use with E2E frontend testing frameworks that use Mocha. In this context the UI allows you to _separate speed optimizations from your file structure_ resulting in more flexibility with a minimum runtime.

## Design choices

### Bundles work across files
This is the main purpose of the UI. This allows you to separate technical arrangement from your administrative logic.

### Bundles take an object to bundle on
To enable bundling each bundle needs an id. By making this id into an object it can double as input for the `bundle.beforeEach` and `bundle.afterEach` functions. This allows you to customise the before and after scripts to suit each bundles contents.

### Bundles only work within their nesting level
Bundling on different nesting levels can be confusing and can thus lead to accidental bundling. To keep things clean and clear bundling across nesting levels is not possible.

## Limits
As with everything there are limits, below are the ones identified right now that aren't because of a design choice. If you need any of these limits removed, please feel free to add an issue or a pull request with the solution.

* There are no default bundle values.
* Bundles themselves don't support `.skip` and `.only`, but its contents do.
* Bundle setup and teardown functions only work with Mocha async (requires `done()` to be called).
* `bundle` can only be used in combination with the [Supported UIs](#supported-uis)


## Installation

```shell
npm install mocha-bundle-ui
```

Then specify the UI by calling mocha with the `--ui` flag

```shell
mocha --ui BDD-bundle
```

Or add the following line to `mocha.opts`

```shell
--ui BDD-bundle
```


## Supported UIs
Mocha bundle UI is an extention of existing UIs. The following are supported at this point.

Note on adding a UI: Extending an existing UI is actually pretty easy in most cases, but it sadly requires the UI to be copied into the Mocha bundle UI repo. If you want to use `bundle` in an unsupported UI please add an issue or make a pull request.

### [Mocha BDD](https://mochajs.org/#bdd)
The Mocha default UI. This UI is fully supported.

```
--ui BDD-bundle
```

```javascript
bundle.beforeEach(function(parameters, done) {
    // Do some setup using the parameters as input
    done();
});

bundle.afterEach(function(parameters, done) {
    // Do some teardown using the parameters as input
    done();
});

bundle({ foo: 'bar' }, function() {
    describe('An amazing test description', function() {
        it('is amazing', function() {
            // ...
        });
    });
});
```

### [Mocha TDD](https://mochajs.org/#tdd)
Another popular Mocha UI. This UI is fully supported.

```
--ui TDD-bundle
```

```javascript
bundle.setup(function(parameters, done) {
    // Do some setup using the parameters as input
    done();
});

bundle.teardown(function(parameters, done) {
    // Do some teardown using the parameters as input
    done();
});

bundle({ foo: 'bar' }, function() {
    suite('An amazing test description', function() {
        test('is amazing', function() {
            // ...
        });
    });
});
```


## Examples
Below are some basic examples of using `bundle` using the `BDD-bundle` UI.

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

Result:

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

Result:

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

Result:

```
  Bundle with parameters: foo = bar
before
{ foo: 'bar' }
    An amazing test description
      ✓ is amazing
after
{ foo: 'bar' }
```


