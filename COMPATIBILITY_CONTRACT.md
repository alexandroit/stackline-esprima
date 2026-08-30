# Compatibility Contract

`@stackline/esprima@1.x` targets the observable public behavior of
`esprima@4.0.1`.

## Preserved

- enumerable exports: `Syntax`, `parse`, `parseModule`, `parseScript`,
  `tokenize`, and `version`;
- `version === '4.0.1'` as an API compatibility value;
- parsing and tokenization options, delegates, tolerant errors, comments,
  attached comments, ranges, locations, source labels, tokens, JSX, scripts,
  and modules;
- ESTree-shaped output and upstream error metadata;
- CommonJS and direct browser-global loading from `dist/esprima.js`;
- AMD loading and the `esparse` and `esvalidate` commands;
- ES5 runtime syntax and Node.js 8 or newer.

## Additive

- package-scoped name `@stackline/esprima`;
- first-party TypeScript declarations;
- modern release metadata, security policy, CI, checksums, and SBOMs.

## Intentionally unchanged

The parser's accepted grammar remains ECMAScript 2017 plus experimental JSX.
This maintenance line does not reinterpret newer JavaScript syntax as valid.
Changing the grammar would violate the drop-in behavior required by existing
Esprima 4 consumers.
