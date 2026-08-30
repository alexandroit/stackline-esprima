import { rm } from 'node:fs/promises';

await Promise.all([
  rm('.build', { recursive: true, force: true }),
  rm('dist/esprima.js', { force: true }),
  rm('test/dist/fixtures_js.js', { force: true }),
  rm('test/dist/fixtures_json.js', { force: true })
]);
