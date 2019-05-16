const path = require('path');
const { lstatSync, readdirSync } = require('fs-extra');

const objMap = (fn, obj) =>
  obj &&
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key);
    return acc;
  }, {});

const isDirectory = source => lstatSync(source).isDirectory();
const getSubdirectories = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

const updateConfig = (config, version, deps) => {
  return {
    ...config,
    version,
    dependencies: objMap(
      (prop, key) => (deps.includes(key) ? version : prop),
      config.dependencies
    ),
    devDependencies: objMap(
      (prop, key) => (deps.includes(key) ? version : prop),
      config.devDependencies
    )
  };
};

module.exports = {
  getSubdirectories,
  updateConfig
};
