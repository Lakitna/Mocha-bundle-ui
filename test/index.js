var Mocha = require('mocha');
var readDir = require('recursive-readdir');
var fs = require('fs');
var path = require('path');

global.expect = require("chai").expect;

// import mocha-bundle-ui exposing the UI's
require("../index");


/**
 * Setup and run a Mocha instance
 * @param {string} rootDir
 * @param {object} mochaOpts
 */
function mochaInstance(rootDir, mochaOpts) {
    console.log("Running tests for UI " + mochaOpts.ui);

    return new Promise(resolve => {
        let mocha = new Mocha(mochaOpts);

        readDir(rootDir)
            .then(files => {
                return files.filter(f => f.substr(-3) === '.js');
            })
            .then(files => {
                files.forEach(file => {
                    mocha.addFile(file);
                });
            })
            .then(() => {
                mocha
                    .run(function(failures){
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
 */
async function run() {
    await mochaInstance('./test/bdd', {
        ui: "BDD-bundle",
    });

    await mochaInstance('./test/tdd', {
        ui: "TDD-bundle",
    });
}

run();
