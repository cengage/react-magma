const path = require('path');
const { writeJsonSync, existsSync } = require('fs-extra');
const { getSubdirectories, updateConfig } = require('./utils');

const rootPackagePath = path.resolve(__dirname, '../package.json');
const rootPackage = require(rootPackagePath);

const targetVersion = rootPackage.version;

const lernaConfigPath = path.resolve(__dirname, '../lerna.json');
const lernaConfig = require(lernaConfigPath);
const updatedLernaConfig = { ...lernaConfig, version: targetVersion };

// todo: consider getting this from lerna.json & handling multiple paths in the array
const packageDir = path.resolve(__dirname, '../packages');
const packagePaths = getSubdirectories(packageDir);

const packages = packagePaths
  .filter(path => existsSync(`${path}/package.json`))
  .map(path => {
    const packagePath = `${path}/package.json`;
    const config = require(packagePath);
    const name = config.name;
    return { path: packagePath, name, config };
  });

const packageNames = packages.map(p => p.name);

// Update and write each package's version && version its symlinked dependencies
packages.forEach(package => {
  const updatedConfig = updateConfig(
    package.config,
    targetVersion,
    packageNames
  );
  writeJsonSync(package.path, updatedConfig, { spaces: 2 });
});

// Write out updated lerna config
writeJsonSync(lernaConfigPath, updatedLernaConfig, { spaces: 2 });
