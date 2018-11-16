const utils = require('../include/utils');


let beforeEachBundleFunction = function(_, done) { done(); };
let afterEachBundleFunction = function(_, done) { done(); };


/**
 * Require and expose bundle UI elements
 * @param {Object} common
 * @param {Array} suites
 * @param {string} file
 */
module.exports = function(common, suites, file) {
    /**
     * Describe a "suite" with given `parameters` to bundle on
     * and a callback `fn` containing nested suites and/or tests.
     * @param {object} parameters - Bundle parameters
     * @param {function} fn - Callback function
     */
    let ret = function bundle(parameters, fn) {
        let bundle = createBundle(parameters, fn);
        let bundleContext = bundle.parent;
        bundleContext.suites.pop();

        let foundExisting = false;
        for (let i=0; i < bundleContext.suites.length; i++) {
            let suite = bundleContext.suites[i];

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
     * Function to run before each bundle
     * @param {object} parameters - Bundle parameters
     * @param {function} done - Mocha done()
     */
    ret.beforeEach = function(fn) {
        beforeEachBundleFunction = fn;
    }

    /**
     * Function to run after each bundle
     * @param {object} parameters - Bundle parameters
     * @param {function} done - Mocha done()
     */
    ret.afterEach = function(fn) {
        afterEachBundleFunction = fn;
    };


    /**
     * Create a new bundle
     * @param {object} parameters - Bundle parameters
     * @param {function} fn - Callback function
     */
    function createBundle(parameters, fn) {
        let description = "Bundle with parameters:";
        for (let key in parameters) {
            description += ` ${key} = ${parameters[key]} &`;
        }

        let bundle = common.suite.create({
            title: description.replace(/\s+\&$/, ""),
            file: file,
            fn: fn
        });
        bundle.params = parameters;

        bundle.beforeAll("Before bundle", function(done) {
            beforeEachBundleFunction(parameters, done);
        });

        bundle.afterAll("After bundle", function(done) {
            afterEachBundleFunction(parameters, done);
        });

        return bundle;
    }


    return ret;
};
