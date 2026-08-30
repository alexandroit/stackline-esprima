# @stackline/esprima

A compatibility-first maintained continuation of
[`esprima@4.0.1`](https://www.npmjs.com/package/esprima). It parses and
tokenizes ECMAScript 2017 and JSX using the established Esprima API, while
shipping a reproducible build, first-party TypeScript declarations, and no
production dependencies.

This project is independent. It is not affiliated with or endorsed by the
JS Foundation, OpenJS Foundation, jQuery, Ariya Hidayat, or the upstream
Esprima project.

## Install

```sh
npm install @stackline/esprima
```

Existing applications can preserve `require('esprima')` and imports from
`esprima` with an npm alias:

```sh
npm install esprima@npm:@stackline/esprima
```

```js
const esprima = require('esprima')
const program = esprima.parseScript('const answer = 42')
```

The alias changes dependency resolution only. Application source code does
not need to change.

## Compatibility

- the six enumerable exports from `esprima@4.0.1` are preserved;
- `parse`, `parseScript`, `parseModule`, `tokenize`, `Syntax`, and the
  compatibility value `version === '4.0.1'` retain their upstream behavior;
- CommonJS, browser-global, AMD, `esparse`, and `esvalidate` entry points are
  preserved;
- the generated runtime is ES5 and is validated on Node.js 8 through current
  supported Node releases;
- TypeScript declarations are additive and compile with TypeScript 3.9;
- the package has no production, optional, or peer dependency edges.

`@stackline/esprima` uses its own package version. The first Stackline release
is `1.0.0`, while the public `esprima.version` value intentionally remains
`4.0.1` for drop-in compatibility.

See [COMPATIBILITY_CONTRACT.md](./COMPATIBILITY_CONTRACT.md) for the exact
boundary and [MIGRATION.md](./MIGRATION.md) for migration guidance.

## Parsing

```js
const esprima = require('@stackline/esprima')

const program = esprima.parseScript('const answer = 42', {
  loc: true,
  range: true,
  tokens: true
})

console.log(program.body[0].type)
```

Use `parseModule` for ECMAScript modules:

```js
const moduleProgram = esprima.parseModule('export default 42')
```

The historical `parse` method is also preserved. Set `sourceType: 'module'`
when parsing module source through that method.

## Tokenizing

```js
const tokens = esprima.tokenize('answer += 1', {
  loc: true,
  range: true
})
```

## JSX

```js
const program = esprima.parseScript('<Panel value={answer} />', {
  jsx: true
})
```

JSX support remains experimental, matching upstream `4.0.1`.

## Command line

```sh
esparse --loc source.js
esvalidate source.js
```

Both commands also accept standard input with `-`.

## Scope

This is an ECMAScript 2017 compatibility parser. It does not claim support for
newer JavaScript grammar such as optional chaining, class fields, import
attributes, or current proposal syntax. Consumers that need a modern language
grammar should select a parser designed for that grammar instead of assuming
that a maintenance release changes Esprima's accepted language.

## Release quality

Every release is gated by the original fixture and regression suites,
differential checks against `esprima@4.0.1`, hostile-environment and malformed
input tests, browser and CLI checks, TypeScript 3.9/current compilation,
warning-free packed installs, valid dependency trees, and zero audit findings.

## Security

Report suspected vulnerabilities privately as described in
[SECURITY.md](./SECURITY.md). Parsing untrusted source still requires caller
limits for input size, concurrency, memory, and execution deadlines.

## License

BSD-2-Clause. The complete upstream copyright and license are retained in
[LICENSE](./LICENSE), [NOTICE](./NOTICE), and
[THIRD_PARTY_LICENSES.md](./THIRD_PARTY_LICENSES.md).
