import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile('dist/esprima.js', 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context, { filename: 'esprima.js', timeout: 5_000 });

assert.equal(context.esprima.version, '4.0.1');
assert.equal(context.esprima.parseScript('const answer = 42').body[0].type, 'VariableDeclaration');
assert.equal(context.esprima.parseModule('export default 42').sourceType, 'module');
assert.equal(context.esprima.tokenize('value => value').length, 3);

let amdExport;
const amdContext = vm.createContext({
  define(factory) {
    amdExport = factory();
  }
});
amdContext.define.amd = true;
vm.runInContext(source, amdContext, { filename: 'esprima.amd.js', timeout: 5_000 });
assert.equal(amdExport.version, '4.0.1');

process.stdout.write('browser and AMD artifacts are operational\n');
