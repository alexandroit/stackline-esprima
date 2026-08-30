'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const esprima = require('../..');

const dangerousKeys = ['__proto__', 'prototype', 'constructor'];

test('dangerous property names remain syntax and do not modify prototypes', function () {
    delete Object.prototype.stacklinePolluted;
    const source = [
        '({',
        '  __proto__: { stacklinePolluted: true },',
        '  prototype: { stacklinePolluted: true },',
        '  constructor: { prototype: { stacklinePolluted: true } }',
        '});'
    ].join('\n');

    const ast = esprima.parseScript(source, { range: true, tokens: true });
    assert.equal(ast.type, 'Program');
    assert.equal(Object.prototype.stacklinePolluted, undefined);
    assert.equal(({}).stacklinePolluted, undefined);
});

test('null-prototype option objects are accepted without unsafe assignment', function () {
    const options = Object.create(null);
    options.range = true;
    dangerousKeys.forEach(function (key) {
        Object.defineProperty(options, key, {
            enumerable: true,
            value: { stacklinePolluted: true }
        });
    });

    const ast = esprima.parse('value', options);
    assert.deepEqual(ast.range, [0, 5]);
    assert.equal(Object.prototype.stacklinePolluted, undefined);
});

test('hostile inherited keys do not change parser behavior', function () {
    const prototype = Object.create(null);
    prototype.comment = true;
    prototype.tokens = true;
    dangerousKeys.forEach(function (key) {
        prototype[key] = { stacklinePolluted: true };
    });
    const options = Object.create(prototype);
    options.range = true;

    const ast = esprima.parse('answer = 42', options);
    assert.equal(ast.type, 'Program');
    assert.equal(Object.prototype.stacklinePolluted, undefined);
});
