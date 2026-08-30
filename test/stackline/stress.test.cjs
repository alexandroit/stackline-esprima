'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

test('large malformed inputs terminate under a hard process deadline', function () {
    const packageRoot = path.resolve(__dirname, '../..');
    const program = [
        'const esprima = require(' + JSON.stringify(packageRoot) + ');',
        "const inputs = ['a'.repeat(1000000) + ' =', '/*'.repeat(200000), '\"' + 'x'.repeat(1000000)];",
        'for (const input of inputs) {',
        '  try { esprima.parse(input, { tolerant: true }); } catch (_) {}',
        '  esprima.tokenize(input, { tolerant: true });',
        '}'
    ].join('\n');

    const result = spawnSync(process.execPath, ['-e', program], {
        encoding: 'utf8',
        timeout: 12_000,
        maxBuffer: 1024 * 1024
    });

    assert.equal(result.error && result.error.code, undefined, result.error && result.error.message);
    assert.equal(result.signal, null, result.stderr);
    assert.equal(result.status, 0, result.stderr);
});
