# @stackline/esprima

> Compatibility-first maintained Esprima 4 parser with a dependency-free runtime, reproducible build, and first-party types.

[![npm version](https://img.shields.io/npm/v/@stackline/esprima.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/esprima)
[![license](https://img.shields.io/npm/l/@stackline/esprima.svg?style=flat-square)](https://github.com/alexandroit/stackline-esprima)
[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-esprima)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/esprima/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/esprima/)** | **[npm](https://www.npmjs.com/package/@stackline/esprima)** | **[Issues](https://github.com/alexandroit/stackline-esprima/issues)** | **[Repository](https://github.com/alexandroit/stackline-esprima)**

**Current package version:** `1.0.3`

---

## Why this package?

A compatibility-first maintained continuation of
[`esprima@4.0.1`](https://www.npmjs.com/package/esprima). It parses and
tokenizes ECMAScript 2017 and JSX using the established Esprima API, while
shipping a reproducible build, first-party TypeScript declarations, and no
production dependencies.

This project is independent. It is not affiliated with or endorsed by the
JS Foundation, OpenJS Foundation, jQuery, Ariya Hidayat, or the upstream
Esprima project.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/esprima@1.0.3` |
| Node.js runtime | `>=8` |
| CommonJS / primary entry | `./dist/esprima.js` |
| Type declarations | `./index.d.ts` |

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

See [COMPATIBILITY_CONTRACT.md](https://github.com/alexandroit/stackline-esprima/blob/main/COMPATIBILITY_CONTRACT.md) for the exact
boundary and [MIGRATION.md](https://github.com/alexandroit/stackline-esprima/blob/main/MIGRATION.md) for migration guidance.

## Installation

<a id="install"></a>

### Install

```sh
npm install @stackline/esprima
```

Existing applications can preserve `require('esprima')` and imports from
`esprima` with an npm alias:

## Usage

```sh
npm install esprima@npm:@stackline/esprima
```

```js
const esprima = require('esprima')
const program = esprima.parseScript('const answer = 42')
```

The alias changes dependency resolution only. Application source code does
not need to change.

## Features and Integrations

<a id="parsing"></a>

### Parsing

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

<a id="tokenizing"></a>

### Tokenizing

```js
const tokens = esprima.tokenize('answer += 1', {
  loc: true,
  range: true
})
```

<a id="jsx"></a>

### JSX

```js
const program = esprima.parseScript('<Panel value={answer} />', {
  jsx: true
})
```

JSX support remains experimental, matching upstream `4.0.1`.

<a id="command-line"></a>

### Command line

```sh
esparse --loc source.js
esvalidate source.js
```

Both commands also accept standard input with `-`.

<a id="scope"></a>

### Scope

This is an ECMAScript 2017 compatibility parser. It does not claim support for
newer JavaScript grammar such as optional chaining, class fields, import
attributes, or current proposal syntax. Consumers that need a modern language
grammar should select a parser designed for that grammar instead of assuming
that a maintenance release changes Esprima's accepted language.

<a id="release-quality"></a>

### Release quality

Every release is gated by the original fixture and regression suites,
differential checks against `esprima@4.0.1`, hostile-environment and malformed
input tests, browser and CLI checks, TypeScript 3.9/current compilation,
warning-free packed installs, valid dependency trees, and zero audit findings.

## Security

Report suspected vulnerabilities privately as described in
[SECURITY.md](https://github.com/alexandroit/stackline-esprima/blob/main/SECURITY.md). Parsing untrusted source still requires caller
limits for input size, concurrency, memory, and execution deadlines.

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-esprima.git
cd stackline-esprima
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-esprima/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## License

BSD-2-Clause. The complete upstream copyright and license are retained in
[LICENSE](https://github.com/alexandroit/stackline-esprima/blob/main/LICENSE), [NOTICE](https://github.com/alexandroit/stackline-esprima/blob/main/NOTICE), and
[THIRD_PARTY_LICENSES.md](https://github.com/alexandroit/stackline-esprima/blob/main/THIRD_PARTY_LICENSES.md).

## Credits and original authors

- Stackline Maintainers.
- Ariya Hidayat.
- JS Foundation and other Esprima contributors.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
