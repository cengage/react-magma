module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/packages/**/src/**/*.{js,jsx,ts,tsx}',
    '**/patterns/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/?(*.)+(spec|test|stories).{js,ts,mjs,jsx,tsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/patterns/*/jest.config.js',
  ],
  roots: ['<rootDir>'],
  setupFiles: [
    // '<rootDir>/jest.overrides.js',
  ],
  setupFilesAfterEnv: [
    'jest-extended',
    '@testing-library/jest-dom/extend-expect',
    'regenerator-runtime/runtime',
    'jest-axe/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  snapshotSerializers: ['jest-emotion'],
  testPathIgnorePatterns: [
    '/.cache/',
    '/coverage/',
    '/node_modules/',
    '/public/',
    '/reports/',
    '/static/',
    '/dist/',
    '/archived-packages/',
    '/react-magma-legacy-selects/',
  ],
  transform: {
    '^.+\\.(j|t)s(x)?$': ['babel-jest', { cwd: __dirname }],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
