const Mocha = require('mocha');

Mocha.interfaces['bundle-bdd'] = module.exports = require("./interfaces/bdd");
Mocha.interfaces['bundle-BDD'] = module.exports = require("./interfaces/bdd");

// Mocha.interfaces['bundle-tdd'] = module.exports = require("./interfaces/tdd");
// Mocha.interfaces['bundle-TDD'] = module.exports = require("./interfaces/tdd");
