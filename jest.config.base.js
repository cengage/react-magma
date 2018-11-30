module.exports = {
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
  transform: {
    '^.+\\.(j|t)s(x)?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/index.tsx'],
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$', '.snap'],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
