const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  name: 'react-magma-legacy-selects',
  displayName: 'react-magma-legacy-selects'
};
