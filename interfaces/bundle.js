const objectEquals = require('../include/utils').objectEquals;
const BundleError = require('../include/bundleError');


/* istanbul ignore next: Empty function doesn't need test */
let beforeEachBundleFunction = function(done) {
    done();
};
/* istanbul ignore next: Empty function doesn't need test */
let afterEachBundleFunction = function(done) {
    done();
};


/**
 * Require and expose bundle UI elements
 * @param {Object} common
 * @param {Array} suites
 * @param {string} file
 * @param {function} setupFnName - Function to run before each bundle
 * @param {function} teardownFnName - Function to run after each bundle
 *
 * @return {Object}
 */
module.exports = function(common, suites, file, setupFnName, teardownFnName) {
    /**
     * Describe a 'suite' with given `parameters` to bundle on
     * and a callback `fn` containing nested suites and/or tests.
     * @param {object|string} parameters - Bundle parameters
     * @param {function} fn - Callback function
     */
    const returnObject = function bundle(parameters, fn) {
        parameters = enrichParameters(parameters);

        // Creating a bundle automatically adds it to the parent suite (context)
        const bundle = createBundleSuite(parameters, fn);
        const context = bundle.parent;

        // Remove newly made bundle from the context until we find out if
        // there's an existing suite it should be bundled on.
        context.suites.pop();

        const existingBundle = findBundleInContext(parameters, context);
        if (existingBundle) {
            // Add bundle contents to the existing bundle suite
            updateBundle(existingBundle, fn);
        }
        else {
            // Add the bundle back onto the context
            context.suites.push(bundle);
        }
    };

    /**
     * Set the function to run before each bundle
     * @param {function} fn
     *
     * @example // BDD-bundle
     * bundle.beforeEach(function(done) {
     *     console.log(this.parameters);
     * });
     */
    returnObject[setupFnName] = function(fn) {
        beforeEachBundleFunction = fn;
    };

    /**
     * Set the function to run after each bundle
     * @param {function} fn
     *
     * @example // BDD-bundle
     * bundle.beforeEach(function(done) {
     *     console.log(this.parameters);
     * });
     */
    returnObject[teardownFnName] = function(fn) {
        afterEachBundleFunction = fn;
    };


    /**
     * Create a new bundle suite
     * @param {object} parameters - Bundle parameters
     * @param {function} fn - Callback function
     *
     * @return {Suite}
     */
    function createBundleSuite(parameters, fn) {
        const bundle = common.suite.create({
            title: createTitle(parameters),
            file: file,
            fn: fn,
        });

        bundle.files = [file];
        bundle.parameters = parameters;

        bundle.beforeAll('Before bundle', function(done) {
            beforeEachBundleFunction.call(bundle, done);
        });

        bundle.afterAll('After bundle', function(done) {
            afterEachBundleFunction.call(bundle, done);
        });

        return bundle;
    }

    /**
     * Update an existing bundle by merging the new one into it.
     * @param {Suite} bundle
     * @param {function} fn - Callback function
     */
    function updateBundle(bundle, fn) {
        suites.unshift(bundle);

        if (!bundle.files.includes(file)) {
            bundle.files.push(file);
            bundle.file = bundle.files.join(',');
        }
        fn.call(bundle);

        suites.shift(bundle);
    }

    return returnObject;
};


/**
 * Find an existing bundle inside the direct context of the new one compairing
 * on parameters. Returns undefined if no existing bundle is found.
 * @param {object} parameters - Bundle parameters
 * @param {Suite} context the suite containing bundle
 *
 * @return {Suite|undefined}
 */
function findBundleInContext(parameters, context) {
    return context.suites.find((suite) => {
        return suite.parameters && objectEquals(suite.parameters, parameters);
    });
}


/**
 * Create a bundle title based on parameters
 * @param {object} parameters
 *
 * @return {string}
 */
function createTitle(parameters) {
    if (parameters.description) {
        return `Bundle: ${parameters.description}`;
    }

    let description = 'Bundle with parameters:';
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            description += ` ${key} = ${parameters[key]} &`;
        }
    }
    return description.replace(/\s+\&$/, '');
}


/**
 * Enrich parameters
 * @param {object|string} parameters
 *
 * @return {object}
 * @throws {BundleError} If parameter is unsupported
 */
function enrichParameters(parameters) {
    if (typeof parameters === 'object') {
        return parameters;
    }
    if (typeof parameters === 'string') {
        return {description: parameters};
    }

    throw new BundleError('Bundle parameters are of invalid type '
        + `'${typeof parameters}'. `
        + 'Expected an Object or a string.');
}
