import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const destination = 'site-dist';
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js', 'llms.txt', 'robots.txt', 'sitemap.xml']) {
  await cp(`docs-site/${file}`, `${destination}/${file}`);
}

await cp('dist/esprima.js', `${destination}/esprima.js`);
for (const file of [
  'CHANGELOG.md',
  'COMPATIBILITY_CONTRACT.md',
  'LICENSE',
  'MIGRATION.md',
  'NOTICE',
  'README.md',
  'SECURITY.md',
  'THIRD_PARTY_LICENSES.md'
]) {
  await cp(file, `${destination}/${file}`);
}

const manifest = JSON.parse(await readFile('package.json', 'utf8'));
await writeFile(`${destination}/package-meta.json`, JSON.stringify({
  name: manifest.name,
  version: manifest.version,
  compatibilityTarget: 'esprima@4.0.1',
  runtimeDependencies: 0,
  license: manifest.license,
  npm: `https://www.npmjs.com/package/${manifest.name}`,
  repository: 'https://github.com/alexandroit/stackline-esprima'
}, null, 2) + '\n');
