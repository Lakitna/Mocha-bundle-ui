# Mocha bundle UI

[![GitHub license](https://img.shields.io/github/license/Lakitna/Mocha-bundle-ui.svg)](https://github.com/Lakitna/Mocha-bundle-ui/blob/master/LICENSE)
![Node version](https://img.shields.io/badge/Node-%3E%3D%207.6-brightgreen.svg)
[![npm version](https://badge.fury.io/js/mocha-bundle-ui.svg)](https://badge.fury.io/js/mocha-bundle-ui)
[![Coverage Status](https://coveralls.io/repos/github/Lakitna/Mocha-bundle-ui/badge.svg?branch=master)](https://coveralls.io/github/Lakitna/Mocha-bundle-ui?branch=master)

Adds the `bundle` keyword to an existing UI. `bundle` allows you to bundle tests across files into a single suite with a before and after scripts that are executed for every bundle.

This UI was originally made to use with E2E testing frameworks that use Mocha. In this context the UI allows you to _separate speed optimizations from your file structure_. This provides you with the possibility to have both flexibility and a short runtime.

```javascript
bundle('foo', function() {
    it('is now a part of the bundle named `foo`', function() {
        // ...
    });
});

bundle('foo', function() {
    it('is part of the same bundle named `foo` that contains two tests', function() {
        // ...
    });
});
```

## Contents

- [Design choices](#design-choices)
- [Limits](#limits)
- [Installation](#installation)
- [Supported UIs](#supported-uis)

----------

## Design choices

### Bundles work across files
This is the main purpose of the UI. This allows you to separate technical arrangement from your administrative logic.

### You can bundle on objects
To enable bundling each bundle needs an id. This can be either a string or an object. By making this id into an object it can double as input for the `bundle.beforeEach` and `bundle.afterEach` functions. This allows you to customise the before and after scripts to suit each bundle.

### Bundles only work within their nesting level
Bundling on different nesting levels can be confusing and can thus lead to accidental bundling. To keep things clean and clear bundling across nesting levels is not possible.

A notable exception to this rule is calling bundle within a test block. This can be unpredictable but when it works it will always bundle on the top nesting level.

### Bundles don't support `.skip` and `.only`
Bundles don't support this, but their contents do. Enabling this would get very confusing very fast as it would potentially have effect on multiple files.

----------

## Limits
As with everything there are limits, below are the ones identified right now that aren't because of a design choice. Found a limit? Please let me know by creating an issue.

- There are no default bundle values
- `bundle` can only be used in combination with the [Supported UIs](#supported-uis)

----------

## Installation

First make sure you've [installed Mocha 4.1.0 or higher](https://mochajs.org/#installation)

```shell
npm install mocha-bundle-ui
```

Then require & specify the UI by calling mocha with the `--require` & `--ui` flags:

```shell
mocha --require mocha-bundle-ui --ui BDD-bundle
```

You can also add these flags to `mocha.opts`:

```shell
--require mocha-bundle-ui
--ui BDD-bundle
```

[Alternatively you can extend your own UI with bundle](docs/extendUi.md)

----------

## Supported UIs
Mocha bundle UI is an extention of existing UIs. The following are supported at this point.

Note on adding a UI: Extending an existing UI is actually pretty easy in most cases, but it sadly requires the UI to be copied into the Mocha bundle UI repo. If you want to use `bundle` in an unsupported UI please add an issue or make a pull request.

### Mocha BDD

```shell
--ui BDD-bundle
```

```javascript
bundle.beforeEach(function() {
    // ...
});

bundle.afterEach(function() {
    // ...
});

bundle('foo', function() {
    describe('Bundling in BDD', function() {
        it('is now a part of the bundle named foo', function() {
            // ...
        });
    });
});
```

[More details ›](docs/BDD-bundle.md)

### Mocha TDD

```shell
--ui TDD-bundle
```

```javascript
bundle.setup(function() {
    // ...
});

bundle.teardown(function() {
    // ...
});

bundle('foo', function() {
    suite('Bundling in BDD', function() {
        test('The suite is now a part of the bundle named foo', function() {
            // ...
        });
    });
});
```

[More details ›](docs/TDD-bundle.md)
