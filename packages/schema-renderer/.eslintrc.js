const eslintrc = require('../../.eslintrc');

module.exports = {
  ...eslintrc,
  rules: {
    ...eslintrc.rules,
    complexity: 0,
    'no-unused-vars': 0,
  },
};
