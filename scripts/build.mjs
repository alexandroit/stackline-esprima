import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);
const compiler = require.resolve('typescript/bin/tsc');
const output = 'dist/esprima.js';
const temporaryOutput = '.build/esprima.iife.js';

await rm('.build', { recursive: true, force: true });
await mkdir('.build/src', { recursive: true });
await mkdir('dist', { recursive: true });

execFileSync(process.execPath, [
  compiler,
  '-p',
  'src',
  '--outDir',
  '.build/src'
], { stdio: 'inherit' });

await build({
  entryPoints: ['.build/src/esprima.js'],
  outfile: temporaryOutput,
  bundle: true,
  format: 'iife',
  globalName: 'esprima',
  target: ['es5'],
  legalComments: 'inline',
  charset: 'ascii',
  sourcemap: false,
  logLevel: 'info'
});

const bundle = await readFile(temporaryOutput, 'utf8');
const universalExport = [
  '',
  '/* CommonJS and AMD compatibility for the historical Esprima artifact. */',
  'if (typeof module === "object" && module && module.exports) module.exports = esprima;',
  'else if (typeof define === "function" && define.amd) define(function () { return esprima; });',
  ''
].join('\n');

await writeFile(output, bundle + universalExport, 'utf8');

const api = require('../dist/esprima.js');
const expected = ['Syntax', 'parse', 'parseModule', 'parseScript', 'tokenize', 'version'];
const actual = Object.keys(api).sort();
if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  throw new Error(`unexpected public API: ${actual.join(', ')}`);
}
if (api.version !== '4.0.1') {
  throw new Error(`unexpected compatibility version: ${api.version}`);
}
