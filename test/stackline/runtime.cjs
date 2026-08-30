'use strict';

var assert = require('assert');
var esprima = require('../..');

assert.strictEqual(esprima.version, '4.0.1');
assert.strictEqual(esprima.parseScript('var value = 1;').sourceType, 'script');
assert.strictEqual(esprima.parseModule('export default 1;').sourceType, 'module');
assert.strictEqual(esprima.tokenize('value += 1').length, 3);
assert.deepStrictEqual(Object.keys(esprima).sort(), [
    'Syntax',
    'parse',
    'parseModule',
    'parseScript',
    'tokenize',
    'version'
]);

console.log('runtime compatibility verified on ' + process.version);
