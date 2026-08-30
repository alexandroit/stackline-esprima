import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

for (const file of [
  'site-dist/index.html',
  'site-dist/styles.css',
  'site-dist/app.js',
  'site-dist/esprima.js',
  'site-dist/llms.txt',
  'site-dist/robots.txt',
  'site-dist/sitemap.xml',
  'site-dist/package-meta.json'
]) {
  await access(file);
}

const html = await readFile('site-dist/index.html', 'utf8');
assert.match(html, /<link rel="canonical" href="https:\/\/alexandro\.net\/docs\/vanilla\/esprima\/">/);
assert.match(html, /<meta name="robots" content="index,follow/);
assert.match(html, /id="source-input"/);
assert.match(html, /id="result-output"/);

const metadata = JSON.parse(await readFile('site-dist/package-meta.json', 'utf8'));
assert.equal(metadata.name, '@stackline/esprima');
assert.equal(metadata.version, '1.0.0');
assert.equal(metadata.runtimeDependencies, 0);

process.stdout.write('documentation artifact verified\n');
