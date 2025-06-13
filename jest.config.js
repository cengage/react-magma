module.exports = {
  collectCoverage: false,
  testEnvironment: 'jest-environment-jsdom', // jest-environment-jsdom
  collectCoverageFrom: [
    '**/packages/**/src/**/*.{js,jsx,ts,tsx}',
    '**/patterns/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/?(*.)+(spec|test|stories).{js,ts,mjs,jsx,tsx}',
    '!**/.nx/**',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/public/**',
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
  setupFiles: ['<rootDir>/jest.overrides.js'],
  setupFilesAfterEnv: [
    'jest-extended',
    '@testing-library/jest-dom', // TODO: clarify that this is needed for all tests
    'regenerator-runtime/runtime',
    'jest-axe/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  // Investigate this: https://jest-archive-august-2023.netlify.app/docs/29.0/upgrading-to-jest29
  // snapshotFormat: {
  //   escapeString: true,
  //   printBasicPrototype: true,
  // },
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
    '<rootDir>/.nx/',
    '\\.d\\.ts$',
  ],
  transform: {
    '^.+\\.(j|t)s(x)?$': ['babel-jest', { cwd: __dirname }],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
