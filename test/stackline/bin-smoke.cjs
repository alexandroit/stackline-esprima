'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const parser = spawnSync(process.execPath, [path.join(root, 'bin/esparse.js'), '-'], {
    input: 'const answer = 42;',
    encoding: 'utf8'
});
assert.equal(parser.status, 0, parser.stderr);
assert.equal(JSON.parse(parser.stdout).type, 'Program');

const validator = spawnSync(process.execPath, [path.join(root, 'bin/esvalidate.js'), '-'], {
    input: 'const answer = 42;',
    encoding: 'utf8'
});
assert.equal(validator.status, 0, validator.stderr);

const invalid = spawnSync(process.execPath, [path.join(root, 'bin/esvalidate.js'), '-'], {
    input: 'const = 42;',
    encoding: 'utf8'
});
assert.notEqual(invalid.status, 0);

process.stdout.write('command-line compatibility verified\n');
