module.exports = {
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{ts,tsx,mjs}'],
  transform: {
    '^.+\\.ts(x)?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$', '.snap'],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
