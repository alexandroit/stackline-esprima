import * as esprima from '../../..';

const program = esprima.parse('const answer = 42', { jsx: false });
const delegated = esprima.parseScript('value', {}, (node, metadata) => {
  node.type;
  void metadata;
});

program.body;
delegated.sourceType;
