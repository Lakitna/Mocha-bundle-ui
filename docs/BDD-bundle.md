# Mocha BDD + bundle

[Mocha BDD documentation](https://mochajs.org/#bdd)

This file describes the basic use of the UI `BDD-bundle`

## Contents

- [Mocha BDD + bundle](#mocha-bdd--bundle)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Examples](#examples)
    - [Bundling on a string](#bundling-on-a-string)
    - [Bundling on an object](#bundling-on-an-object)
    - [Using beforeEach](#using-beforeeach)
    - [Using afterEach](#using-aftereach)

## Installation

Require & specify BDD + bundle by calling mocha with the `--require` & `--ui` flags

```shell
mocha --require mocha-bundle-ui --ui BDD-bundle
```

Or add the flags to `mocha.opts`

```shell
--require mocha-bundle-ui
--ui BDD-bundle
```

## Examples

### Bundling on a string

The bundle parameters can be simply provided as a descriptive string.

The behaviour below also works when the bundles are placed in different files.

```javascript
bundle('An amazing bundle', function() {
    describe('An amazing test description', function() {
        it('is amazing', function() {
            // ...
        });
    });
});

bundle('An amazing bundle', function() {
    describe('Another test description', function() {
        it('is equally amazing', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle: An amazing bundle
    An amazing test description
      ✓ is amazing
    Another test description
      ✓ is equally amazing
```

### Bundling on an object

The bundle parameters can also be provided as an object. Providing complex objects is supported.

When the key `description` does not exist the description is generated (see example).

The behaviour below also works when the bundles are placed in different files.

```javascript
bundle({ foo: 'bar' }, function() {
    describe('An amazing test description', function() {
        it('is amazing', function() {
            // ...
        });
    });
});

bundle({ foo: 'bar' }, function() {
    describe('Another test description', function() {
        it('is equally amazing', function() {
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
    Another test description
      ✓ is equally amazing
```

### Using beforeEach

Before any bundle is executed the `beforeEach` function is called. This allows you to do some setup before the contents of the bundle are executed. In this function, you have access to the bundle parameters via `this.parameters` and the files that contain parts of the bundle contents via `this.files`.

The `beforeEach` function is shared between all bundles and therefore it only has to be set once.

```javascript
bundle.beforeEach(function() {
    console.log(`The value of foo is ${this.parameters.foo}`);
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
The value of foo is bar
  Bundle with parameters: foo = bar
    An amazing test description
      ✓ is amazing
```

### Using afterEach

After a bundle is done executing its contents the `afterEach` function is called. This allows you to do some teardown, finishing up the bundle. In this function, you have access to the bundle parameters via `this.parameters` and the files that contain parts of the bundle contents via `this.files`.

The `afterEach` function is shared between all bundles and therefore it only has to be set once.

```javascript
bundle.afterEach(function() {
    console.log(`The value of foo is ${this.parameters.foo}`);
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
    An amazing test description
      ✓ is amazing
The value of foo is bar
```
