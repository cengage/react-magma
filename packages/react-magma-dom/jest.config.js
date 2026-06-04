const baseConfig = require('../../jest.config');

const name = __dirname.split('/').pop();

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [`**/packages/${name}/src/**/*.{js,jsx,ts,tsx}`],
  displayName: {
    name,
    color: 'magenta',
  },
  rootDir: '../..',
  testMatch: [`**/${name}/**/?(*.)+(spec|test).{js,jsx,ts,mjs,tsx}`],
};
