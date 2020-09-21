const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const colors = [
  'black',
  'whiteBright',
  'cyanBright',
  'magentaBright',
  'blueBright',
  'yellowBright',
  'greenBright',
  'redBright',
  'blackBright',
  'green',
  'red',
  'white',
  'cyan',
  'magenta',
  'blue',
  'yellow',
]
const isDirectory = directory => source => lstatSync(join(directory,source)).isDirectory()
const ignored = source => ![
  'react-magma-docs', 
  'react-magma-icons', 
  'react-magma-legacy-selects', 
  'react-magma-landing'
].includes(source)

const getDirectories = source =>
  readdirSync(source).filter(isDirectory(source)).filter(ignored)

const buildProjects = source => name => {
  return {
    displayName:{name, color: colors.pop()},
    testMatch: [`<rootDir>/packages/${name}/src/**/?(*.)(spec|test).{js,jsx,mjs}`],
    setupFiles: [
      // './jest.overrides.js',
    ],
    setupFilesAfterEnv: [
      'jest-extended',
      '@testing-library/jest-dom/extend-expect',
      'regenerator-runtime/runtime',
      'jest-axe/extend-expect',
      '<rootDir>/jest.setup.js',
    ],
    transform: {
      '^.+\\.(j|t)s(x)?$': 'babel-jest',
    },
  }
}

const getProjects = source => 
  getDirectories(source).map(buildProjects(source))


module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/packages/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/*.test.*',
    '!**/archived-packages/**',
    '!**/react-magma-docs/**',
    '!**/react-magma-landing/**',
    '!**/react-magma-legacy-selects/**',
    '!**/react-magma-icons/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text'],
  maxConcurrency: 50,
  projects: getProjects('./packages'),
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
  ],
};
