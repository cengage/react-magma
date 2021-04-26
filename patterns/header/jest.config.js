const baseConfig = require('../../jest.config');
const name = __dirname.split('/').pop();
module.exports = {
  ...baseConfig,
  collectCoverageFrom: [
    `**/${name}/src/**/*.{js,jsx,ts,tsx}`,
    `!**/*.stories.tsx`,
  ],
  displayName: {
    name,
    color: 'green',
  },
  projects: ['.'],
  rootDir: '../..',
  testMatch: [`**/${name}/**/?(*.)+(spec|test).{js,ts,tsx,mjs}`],
};