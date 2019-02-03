# Mocha TDD + bundle

[Mocha TDD documentation](https://mochajs.org/#tdd)

This file describes the basic use of the UI `TDD-bundle`

## Contents

- [Mocha TDD + bundle](#mocha-tdd--bundle)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Examples](#examples)
    - [Bundling on a string](#bundling-on-a-string)
    - [Bundling on an object](#bundling-on-an-object)
    - [Using setup](#using-setup)
    - [Using teardown](#using-teardown)

## Installation

Require & specify TDD + bundle by calling mocha with the `--require` & `--ui` flags

```shell
mocha --require mocha-bundle-ui --ui TDD-bundle
```

Or add the flags to `mocha.opts`

```shell
--require mocha-bundle-ui
--ui TDD-bundle
```

## Examples

### Bundling on a string

The bundle parameters can be simply provided as a descriptive string.

The behaviour below also works when the bundles are placed in different files.

```javascript
bundle('An amazing bundle', function() {
    suite('An amazing test description', function() {
        test('amazing things', function() {
            // ...
        });
    });
});

bundle('An amazing bundle', function() {
    suite('Another test description', function() {
        test('equally amazing things', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle: An amazing bundle
    An amazing test description
      ✓ amazing things
    Another test description
      ✓ equally amazing things
```

### Bundling on an object

The bundle parameters can also be provided as an object. Providing complex objects is supported.

When the key `description` does not exist the description is generated (see example).

The behaviour below also works when the bundles are placed in different files.

```javascript
bundle({ foo: 'bar' }, function() {
    suite('An amazing test description', function() {
        test('amazing things', function() {
            // ...
        });
    });
});

bundle({ foo: 'bar' }, function() {
    suite('Another test description', function() {
        test('equally amazing things', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle with parameters: foo = bar
    An amazing test description
      ✓ amazing things
    Another test description
      ✓ equally amazing things
```

### Using setup

Before any bundle is executed the `setup` function is called. This allows you to do some setup before the contents of the bundle are executed. In this function, you have access to the bundle parameters via `this.parameters` and the files that contain parts of the bundle contents via `this.files`.

The `setup` function is shared between all bundles and therefore it only has to be set once.

```javascript
bundle.setup(function() {
    console.log(`The value of foo is ${this.parameters.foo}`);
});

bundle({ foo: 'bar' }, function() {
    suite('An amazing test description', function() {
        test('amazing things', function() {
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
      ✓ amazing things
```

### Using teardown

After a bundle is done executing its contents the `teardown` function is called. This allows you to do some teardown, finishing up the bundle. In this function, you have access to the bundle parameters via `this.parameters` and the files that contain parts of the bundle contents via `this.files`.

The `teardown` function is shared between all bundles and therefore it only has to be set once.

```javascript
bundle.teardown(function() {
    console.log(`The value of foo is ${this.parameters.foo}`);
});

bundle({ foo: 'bar' }, function() {
    suite('An amazing test description', function() {
        test('amazing things', function() {
            // ...
        });
    });
});
```

Results in:

```
  Bundle with parameters: foo = bar
    An amazing test description
      ✓ amazing things
The value of foo is bar
```
