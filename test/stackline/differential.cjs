'use strict';

const assert = require('assert');
const current = require('../..');
const baseline = require('esprima-baseline');

function normalize(value) {
    if (value instanceof RegExp) {
        return { source: value.source, flags: value.flags };
    }
    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            description: value.description,
            index: value.index,
            lineNumber: value.lineNumber,
            column: value.column
        };
    }
    if (Array.isArray(value)) {
        return value.map(normalize);
    }
    if (value && typeof value === 'object') {
        const result = {};
        Object.keys(value).sort().forEach(function (key) {
            result[key] = normalize(value[key]);
        });
        return result;
    }
    return value;
}

function capture(fn) {
    try {
        return { ok: true, value: normalize(fn()) };
    } catch (error) {
        return { ok: false, value: normalize(error) };
    }
}

function compare(method, source, options) {
    const expected = capture(function () {
        return baseline[method](source, options && Object.assign({}, options));
    });
    const actual = capture(function () {
        return current[method](source, options && Object.assign({}, options));
    });
    assert.deepStrictEqual(actual, expected, method + ' mismatch for ' + JSON.stringify(source));
}

const cases = [
    '',
    'var answer = 42;',
    'const arrow = (value = 1) => value ** 2;',
    'class Example extends Base { static get value() { return 1; } }',
    'async function load() { await task(); }',
    '({ __proto__: null, constructor: 1, prototype: 2 });',
    '/(?<name>value)/u;',
    'function* values() { yield* [1, 2, 3]; }',
    '<Panel value={items.map(item => item.id)} />',
    'export { value as default };',
    'import value, * as tools from "module";',
    'if (true) {',
    'const = 1;',
    '"unterminated',
    '/* unterminated',
    '\\u{110000}',
    'for (const item of ) {}'
];

const options = [
    undefined,
    { range: true, loc: true },
    { tokens: true, comment: true, tolerant: true, range: true },
    { jsx: true, range: true },
    { sourceType: 'module', tolerant: true }
];

cases.forEach(function (source) {
    options.forEach(function (configuration) {
        compare('parse', source, configuration);
        compare('tokenize', source, configuration);
    });
});

for (let index = 0; index < 250; index += 1) {
    const name = 'value' + index;
    const source = 'function ' + name + '(input) { return input + ' + index + '; }';
    compare('parseScript', source, { range: true, loc: true, tokens: true });
    compare('tokenize', source, { range: true, loc: true });
}

compare('parseModule', 'export default function () { return 1; }', { loc: true });
assert.deepStrictEqual(Object.keys(current).sort(), Object.keys(baseline).sort());
assert.strictEqual(current.version, baseline.version);

process.stdout.write('differential compatibility verified\n');
