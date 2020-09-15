module.exports = {
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
  transform: {
    '^.+\\.(j|t)s(x)?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.*',
    '!src/index.ts',
    '!src/theme/*.ts',
  ],
  coveragePathIgnorePatterns: ['.snap'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
