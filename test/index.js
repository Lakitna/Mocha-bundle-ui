/**
 * @fileoverview Run Mocha multiple times with different UI's in different folders
 */

const Mocha = require('mocha');
const readDir = require('recursive-readdir');

global.expect = require('chai').expect;

// import mocha-bundle-ui exposing the UI's
require('../index');


/**
 * Setup and run a Mocha instance and run its tests
 * @param {string} rootDir
 * @param {object} mochaOpts
 *
 * @return {Promise.<undefined>}
 */
function mochaInstance(rootDir, mochaOpts) {
    console.log('Running tests for UI ' + mochaOpts.ui);

    return new Promise((resolve) => {
        const mocha = new Mocha(mochaOpts);

        readDir(rootDir)
            .then((files) => {
                return files.filter((f) => f.substr(-3) === '.js');
            })
            .then((files) => {
                files.forEach((file) => {
                    mocha.addFile(file);
                });
            })
            .then(() => {
                mocha
                    .run(function(failures) {
                        process.exitCode = failures ? 1 : 0;
                    })
                    .on('end', function() {
                        resolve();
                    });
            });
    });
}


/**
 * Run tests
 * @async
 */
async function run() {
    await mochaInstance('./test/bdd', {
        ui: 'BDD-bundle',
    });

    await mochaInstance('./test/tdd', {
        ui: 'TDD-bundle',
    });
}

run();
