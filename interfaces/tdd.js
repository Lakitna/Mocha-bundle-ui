'use strict';

/**
 * Module dependencies.
 */

const Test = require('mocha/lib/test');

/**
 * TDD-bundle interface:
 *
 *    bundle({foo: 'bar'}, function() {
 *      suite('Array', function() {
 *        suite('#indexOf()', function() {
 *          suiteSetup(function() {
 *
 *          });
 *
 *          test('should return -1 when not present', function() {
 *
 *          });
 *
 *          test('should return the index when present', function() {
 *
 *          });
 *
 *          suiteTeardown(function() {
 *
 *          });
 *        });
 *      });
 *    });
 *
 * @param {Suite} suite Root suite.
 */
module.exports = function(suite) {
    const suites = [suite];

    suite.on('pre-require', function(context, file, mocha) {
        const common = require('mocha/lib/interfaces/common')(suites, context, mocha);

        context.setup = common.beforeEach;
        context.teardown = common.afterEach;
        context.suiteSetup = common.before;
        context.suiteTeardown = common.after;
        context.run = mocha.options.delay && common.runWithSuite(suite);

        context.bundle = require('./bundle')(common, suites, file, 'setup', 'teardown');

        /**
         * Describe a 'suite' with the given `title` and callback `fn` containing
         * nested suites and/or tests.
         * @param {string} title
         * @param {function} fn
         *
         * @return {Suite}
         */
        context.suite = function(title, fn) {
            return common.suite.create({
                title: title,
                file: file,
                fn: fn,
            });
        };

        /**
         * Pending suite.
         * @param {string} title
         * @param {function} fn
         *
         * @return {Suite}
         */
        context.suite.skip = function(title, fn) {
            return common.suite.skip({
                title: title,
                file: file,
                fn: fn,
            });
        };

        /**
         * Exclusive test-case.
         * @param {string} title
         * @param {function} fn
         *
         * @return {Suite}
         */
        context.suite.only = function(title, fn) {
            return common.suite.only({
                title: title,
                file: file,
                fn: fn,
            });
        };

        /**
         * Describe a specification or test-case with the given `title` and
         * callback `fn` acting as a thunk.
         * @param {string} title
         * @param {function} fn
         *
         * @return {Test}
         */
        context.test = function(title, fn) {
            const suite = suites[0];
            if (suite.isPending()) {
                fn = null;
            }
            const test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };

        /**
         * Exclusive test-case.
         * @param {string} title
         * @param {function} fn
         *
         * @return {Test}
         */
        context.test.only = function(title, fn) {
            return common.test.only(mocha, context.test(title, fn));
        };

        context.test.skip = common.test.skip;
        context.test.retries = common.test.retries;
    });
};
