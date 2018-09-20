const base = require('./jest.config.base.js');

module.exports = {
  ...base,
  projects: [
    '<rootDir>/packages/react-magma-core/jest.config.js',
    '<rootDir>/packages/react-magma-dom/jest.config.js'
  ],
  coverageDirectory: '<rootDir>/coverage/'
};
