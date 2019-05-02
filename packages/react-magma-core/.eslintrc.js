module.exports = {
  env: {
    jest: true
  },
  extends: 'cengage/react',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/display-name': 0
  }
};
