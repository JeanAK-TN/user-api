const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const filesToCopy = ['app.js', 'server.js', 'README.md'];

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

for (const file of filesToCopy) {
  fs.copyFileSync(path.join(rootDir, file), path.join(distDir, file));
}

const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  main: 'server.js',
  scripts: {
    start: 'node server.js'
  },
  dependencies: packageJson.dependencies
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  `${JSON.stringify(distPackageJson, null, 2)}\n`,
  'utf8'
);

console.log(`Build output generated in ${distDir}`);
