module.exports = {
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{ts,tsx,mjs}'],
  transform: {
    '^.+\\.ts(x)?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  verbose: true
}
