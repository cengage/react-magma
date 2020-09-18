const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: 'react-magma-core',
  displayName: 'react-magma-core',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
