import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('package.json', 'utf8'));
assert.deepEqual(manifest.dependencies, undefined);
assert.deepEqual(manifest.optionalDependencies, undefined);
assert.deepEqual(manifest.peerDependencies, undefined);
assert.equal(manifest.license, 'BSD-2-Clause');

for (const file of ['LICENSE', 'NOTICE', 'THIRD_PARTY_LICENSES.md']) {
  await access(file);
}

const license = await readFile('LICENSE', 'utf8');
assert.match(license, /Copyright JS Foundation and other contributors/);
process.stdout.write('license and dependency inventory verified\n');
