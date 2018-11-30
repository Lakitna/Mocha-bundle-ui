const utils = require('../include/utils');

/* istanbul ignore next: Empty function doesn't need test */
let beforeEachBundleFunction = function(_, done) {
    done();
};
/* istanbul ignore next: Empty function doesn't need test */
let afterEachBundleFunction = function(_, done) {
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
     * @param {object} parameters - Bundle parameters
     * @param {function} fn - Callback function
     */
    const ret = function bundle(parameters, fn) {
        const bundle = createBundle(parameters, fn);
        const bundleContext = bundle.parent;
        bundleContext.suites.pop();

        let foundExisting = false;
        for (let i=0; i < bundleContext.suites.length; i++) {
            const suite = bundleContext.suites[i];

            if (suite.params && utils.objectEquals(suite.params, parameters)) {
                suites.unshift(suite);
                fn.call(suite);
                suites.shift(suite);

                foundExisting = true;
                break;
            }
        }

        if (!foundExisting) {
            bundleContext.suites.push(bundle);
        }
    };

    /**
     * Set the function to run before each bundle
     * @param {function} fn
     */
    ret[setupFnName] = function(fn) {
        beforeEachBundleFunction = fn;
    };

    /**
     * Set the function to run after each bundle
     * @param {function} fn
     */
    ret[teardownFnName] = function(fn) {
        afterEachBundleFunction = fn;
    };


    /**
     * Create a new bundle
     * @param {object} parameters - Bundle parameters
     * @param {function} fn - Callback function
     *
     * @return {Suite}
     */
    function createBundle(parameters, fn) {
        let description = 'Bundle with parameters:';
        for (const key in parameters) {
            if (key) {
                description += ` ${key} = ${parameters[key]} &`;
            }
        }

        const bundle = common.suite.create({
            title: description.replace(/\s+\&$/, ''),
            file: file,
            fn: fn,
        });
        bundle.params = parameters;

        bundle.beforeAll('Before bundle', function(done) {
            beforeEachBundleFunction(parameters, done);
        });

        bundle.afterAll('After bundle', function(done) {
            afterEachBundleFunction(parameters, done);
        });

        return bundle;
    }


    return ret;
};
