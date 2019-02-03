# Extending a UI

Extending an existing UI is actually pretty simple.

## Step 1: Install mocha-bundle-ui

Make sure you have access to the mocha-bundle-ui code. This step can be skipped if you are adding a UI to the mocha-bundle-ui repository.

```shell
npm install mocha-bundle-ui
```

## Step 2: Require the bundle builder

```javascript
const bundleBuilder = require('mocha-bundle-ui/interfaces/bundle.js');
```

## Step 3: Add bundle to your UI

This is the place where you define the keywords for what I named `bundle`, `beforeEach` and `afterEach`.

Note that only line 7 actually contains code for the bundle, the rest is boilerplate and such.

```javascript
module.exports = function(suite) {
    const suites = [suite];

    suite.on('pre-require', function(context, file, mocha) {
        const common = require('mocha/lib/interfaces/common')(suites, context, mocha);

        context.bundle = bundleBuilder(common, suites, file, 'beforeEach', 'afterEach');

        // The rest of your UI definitions go here
    });
};

```

## Step 4: Bundle all the things!

That's it, easy peasy!

Well, it always is for the one who wrote it. If you get stuck please don't hesitate to open an issue.
