const eslintrc = require('../../.eslintrc');

module.exports = {
  ...eslintrc,
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    complexity: 0,
    'no-unused-vars': 0,
  },
};
