module.exports = {
  testMatch: ["<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"],
  transform: {
    "^.+\\.(j|t)s(x)?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/index.js"],
  coveragePathIgnorePatterns: [".snap"],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  verbose: true
};
