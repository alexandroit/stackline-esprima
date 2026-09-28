import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const root = await mkdtemp(path.join(os.tmpdir(), 'stackline-esprima-smoke-'));
const artifactDirectory = path.join(root, 'artifact');
const consumer = path.join(root, 'consumer');

try {
  execFileSync('mkdir', ['-p', artifactDirectory, consumer]);
  const packed = JSON.parse(execFileSync('npm', [
    'pack',
    '--json',
    '--pack-destination',
    artifactDirectory
  ], { encoding: 'utf8' }));
  const tarball = path.join(artifactDirectory, packed[0].filename);

  execFileSync('npm', ['init', '-y'], { cwd: consumer, stdio: 'ignore' });
  const installOutput = execFileSync('npm', [
    'install',
    '--save-exact',
    tarball
  ], { cwd: consumer, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  assert.doesNotMatch(installOutput, /deprecated|warn/i);

  execFileSync('npm', ['ls', '--all'], { cwd: consumer, stdio: 'inherit' });
  execFileSync('npm', ['audit', '--omit=dev', '--audit-level=low'], {
    cwd: consumer,
    stdio: 'inherit'
  });
  execFileSync(process.execPath, ['-e', [
    "const e = require('@stackline/esprima');",
    "if (e.version !== '4.0.1') process.exit(1);",
    "if (e.parse('let x = 1').body.length !== 1) process.exit(1);"
  ].join('')], { cwd: consumer, stdio: 'inherit' });

  const installed = JSON.parse(await readFile(
    path.join(consumer, 'node_modules/@stackline/esprima/package.json'),
    'utf8'
  ));
  assert.equal(installed.version, '1.0.1');
  assert.equal(installed.dependencies, undefined);
} finally {
  await rm(root, { recursive: true, force: true });
}

process.stdout.write('packed consumer install is clean\n');
