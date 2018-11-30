module.exports = {
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
  transform: {
    '^.+\\.(j|t)s(x)?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.ts',
    '!src/theme/*.ts'
  ],
  coveragePathIgnorePatterns: ['.snap'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
