const Mocha = require('mocha');

Mocha.interfaces['bdd-bundle'] = module.exports = require('./interfaces/bdd');
Mocha.interfaces['BDD-bundle'] = module.exports = require('./interfaces/bdd');

Mocha.interfaces['tdd-bundle'] = module.exports = require('./interfaces/tdd');
Mocha.interfaces['TDD-bundle'] = module.exports = require('./interfaces/tdd');
