<h1 align="center">Mocha bundle UI</h1>

<p align="center">
<a href="https://badge.fury.io/js/mocha-bundle-ui"><img alt="npm version" src="https://badge.fury.io/js/mocha-bundle-ui.svg"></a>
<img alt="Node version" src="https://img.shields.io/badge/Node-%3E%3D%207.6-brightgreen.svg">
<img alt="Mocha version" src="https://img.shields.io/badge/Mocha-%3E%3D%204.1.0-brightgreen.svg">
<a href="https://coveralls.io/github/Lakitna/Mocha-bundle-ui?branch=master"><img alt="Coverage Status" src="https://coveralls.io/repos/github/Lakitna/Mocha-bundle-ui/badge.svg?branch=master"></a>
</p>

Adds the `bundle` keyword to an existing UI. `bundle` allows you to bundle tests across files into a single suite with a before and after scripts that are executed for every bundle.

This UI was originally made to use with E2E testing frameworks that use Mocha. In this context the UI allows you to _separate speed optimizations from your file structure_. This allows you to have both flexibility and a short runtime.

```javascript
bundle('foo', function() {
    it('is now a part of the bundle named `foo`', function() {
        // ...
    });
});

bundle('foo', function() {
    it('is part of the same bundle named `foo` that now contains two tests', function() {
        // ...
    });
});
```

## Contents

- [Contents](#contents)
- [Design choices](#design-choices)
  - [Bundles work across files](#bundles-work-across-files)
  - [You can bundle on objects](#you-can-bundle-on-objects)
  - [Bundles only work within their nesting level](#bundles-only-work-within-their-nesting-level)
  - [Bundles don't support `.skip` and `.only`](#bundles-dont-support-skip-and-only)
- [Limits](#limits)
- [Installation](#installation)
- [Supported UIs](#supported-uis)
  - [Mocha BDD](#mocha-bdd)
  - [Mocha TDD](#mocha-tdd)

----------

## Design choices

### Bundles work across files
This is the main purpose of the UI. This allows you to separate technical arrangement from your administrative logic.

### You can bundle on objects
To enable bundling each bundle needs an id. This can be either a string or an object. When using an object the bundle id can double as input for the `bundle.beforeEach` and `bundle.afterEach` functions. This allows you to customise the before and after scripts to suit each bundle.

### Bundles only work within their nesting level
Bundling on different nesting levels can be confusing which can lead to accidental bundling. To keep things clean and clear bundling across nesting levels is not possible.

A notable exception to this rule is calling bundle within a test block. This can be unpredictable but when it works it will always bundle on the top nesting level.

### Bundles don't support `.skip` and `.only`
Bundles don't support this, but their contents do. Enabling this would get very confusing very fast as it would potentially have effect on multiple files.

----------

## Limits
As with everything there are limits, below are the ones identified right now that aren't because of a design choice. Found a limit? Please let me know by creating an issue.

- There are no default bundle values
- `bundle` can only be used in combination with [Supported UIs](#supported-uis)

----------

## Installation

```shell
npm install mocha-bundle-ui
```

Then require & specify the UI by calling mocha with the `--require` & `--ui` flags:

```shell
mocha --require mocha-bundle-ui --ui BDD-bundle
```

Or add the flags to `mocha.opts`:

```shell
--require mocha-bundle-ui
--ui BDD-bundle
```

----------

## Supported UIs
Mocha bundle UI is an extention of existing UIs. The following are supported at this point.

Note on adding a UI: Extending an existing UI is actually pretty easy in most cases, but it sadly requires the UI to be copied into the Mocha bundle UI repo. If you want to use `bundle` in an unsupported UI please add an issue or make a pull request.

[Details about adding bundle to your own UI](docs/extendUi.md)

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

[More details about BDD-bundle ›](docs/BDD-bundle.md)

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

[More details about TDD-bundle ›](docs/TDD-bundle.md)
