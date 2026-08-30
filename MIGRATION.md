# Migration

## Keep existing imports

Replace the dependency declaration with an npm alias:

```sh
npm install esprima@npm:@stackline/esprima
```

Existing source remains unchanged:

```js
const esprima = require('esprima')
```

For a deterministic application lockfile, pin the Stackline version exactly:

```json
{
  "dependencies": {
    "esprima": "npm:@stackline/esprima@1.0.0"
  }
}
```

## Use the scoped import

New code can install and import the package directly:

```sh
npm install @stackline/esprima
```

```js
const esprima = require('@stackline/esprima')
```

## Version values

The npm package version and compatibility API value serve different purposes:

- package release: `@stackline/esprima@1.0.0`;
- preserved API value: `esprima.version === '4.0.1'`.

Code that checks the historical API value continues to work.
