#!/usr/bin/env node
// Swap react-codesandboxer for lz-string in website/react-magma-docs/package.json.
// Invoked from the workflow after the tagged source has been checked out and
// before `npm install` so the lockfile is regenerated cleanly.

const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(
  process.cwd(),
  'website/react-magma-docs/package.json'
);

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.dependencies = pkg.dependencies || {};

delete pkg.dependencies['react-codesandboxer'];

pkg.dependencies['lz-string'] = '^1.5.0';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log('Updated', pkgPath, '— removed react-codesandboxer, added lz-string@^1.5.0');
