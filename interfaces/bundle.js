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
    const ret = function bundle(parameters, fn) {
        const bundle = createBundle(parameters, fn);
        const context = bundle.parent;
        context.suites.pop();

        const existingBundle = findBundleInContext(bundle, context);
        if (existingBundle) {
            updateBundle(existingBundle, fn);
        }
        else {
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
    ret[setupFnName] = function(fn) {
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
    ret[teardownFnName] = function(fn) {
        afterEachBundleFunction = fn;
    };


    /**
     * Create a new bundle
     * @param {object|string} parameters - Bundle parameters
     * @param {function} fn - Callback function
     *
     * @return {Suite}
     */
    function createBundle(parameters, fn) {
        const bundle = common.suite.create({
            title: createTitle(parameters),
            file: file,
            fn: fn,
        });

        bundle.files = [file];

        if (typeof parameters == 'string') {
            parameters = {string: parameters};
        }
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

    return ret;
};


/**
 * Find an existing bundle inside the direct context of the new one
 * compairing on parameters. Return the first matching bundle.
 * @param {Suite} bundle
 * @param {Suite} context the suite containing bundle
 *
 * @return {Suite|false}
 */
function findBundleInContext(bundle, context) {
    for (let i=0; i<context.suites.length; i++) {
        const suite = context.suites[i];

        if (suite.parameters
                && objectEquals(suite.parameters, bundle.parameters)) {
            return suite;
        }
    }

    return false;
}


/**
 * @param {object|string} parameters
 *
 * @return {string}
 */
function createTitle(parameters) {
    if (typeof parameters == 'object') {
        let description = 'Bundle with parameters:';
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                description += ` ${key} = ${parameters[key]} &`;
            }
        }
        return description.replace(/\s+\&$/, '');
    }
    else if (typeof parameters == 'string') {
        return `Bundle: ${parameters}`;
    }

    throw new BundleError('Bundle parameters are of invalid type '
        + `'${typeof parameters}'. `
        + 'Expected an Object or a string.');
}
