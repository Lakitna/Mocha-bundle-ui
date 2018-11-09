
const Mocha = require('mocha');
const Suite = require('mocha/lib/suite');
const Test = require('mocha/lib/test');

const utils = require('./utils');


Mocha.interfaces['mocha-bundle-ui'] = module.exports = bddBundleInterface;



/**
 * BDD-bundle-style interface:
 *
 *    bundle({foo: 'bar'}, function() {
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *    });
 *
 * @param {Suite} suite Root suite.
 */
function bddBundleInterface(suite) {
    let suites = [suite];

    let beforeEachBundleFunction = function(_, done) { done(); };
    let afterEachBundleFunction = function(_, done) { done(); };


    suite.on('pre-require', function(context, file, mocha) {
        let common = require('mocha/lib/interfaces/common')(suites, context, mocha);

        context.before = common.before;
        context.after = common.after;
        context.beforeEach = common.beforeEach;
        context.afterEach = common.afterEach;
        context.run = mocha.options.delay && common.runWithSuite(suite);

        /**
         * Describe a "suite" with given `parameters` to bundle on
         * and a callback `fn` containing nested suites and/or tests.
         * @param {object} parameters - Bundle parameters
         * @param {function} fn - Callback function
         */
        context.bundle = function bundle(parameters, fn) {
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
        context.bundle.beforeEach = function(fn) {
            beforeEachBundleFunction = fn;
        }

        /**
         * Function to run after each bundle
         * @param {object} parameters - Bundle parameters
         * @param {function} done - Mocha done()
         */
        context.bundle.afterEach = function(fn) {
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


        /**
         * Original BDD ui below
         */

        /**
         * Describe a "suite" with the given `title`
         * and callback `fn` containing nested suites
         * and/or tests.
         */
        context.describe = context.context = function(title, fn) {
            return common.suite.create({
                title: title,
                file: file,
                fn: fn
            });
        };

        /**
         * Pending describe.
         */
        context.xdescribe = context.xcontext = context.describe.skip = function(
            title,
            fn
        ) {
            return common.suite.skip({
                title: title,
                file: file,
                fn: fn
            });
        };

        /**
         * Exclusive suite.
         */
        context.describe.only = function(title, fn) {
            return common.suite.only({
                title: title,
                file: file,
                fn: fn
            });
        };

        /**
         * Describe a specification or test-case
         * with the given `title` and callback `fn`
         * acting as a thunk.
         */
        context.it = context.specify = function(title, fn) {
            var suite = suites[0];
            if (suite.isPending()) {
                fn = null;
            }
            var test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };

        /**
         * Exclusive test-case.
         */
        context.it.only = function(title, fn) {
            return common.test.only(mocha, context.it(title, fn));
        };

        /**
         * Pending test case.
         */
        context.xit = context.xspecify = context.it.skip = function(title) {
            return context.it(title);
        };

        /**
         * Number of attempts to retry.
         */
        context.it.retries = function(n) {
            context.retries(n);
        };
    });
};
