import esprima = require('../../..');

const script: esprima.Program = esprima.parseScript('const answer = 42', {
  range: true,
  loc: true,
  tokens: true
});
const moduleProgram = esprima.parseModule('export default 42');
const tokens: esprima.Token[] = esprima.tokenize('answer += 1');

script.body[0].type;
moduleProgram.sourceType;
tokens[0].value;
esprima.Syntax.Program;
esprima.version;
