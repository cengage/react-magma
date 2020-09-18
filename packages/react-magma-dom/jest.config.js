const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  name: 'react-magma-dom',
  displayName: 'react-magma-dom'
};
