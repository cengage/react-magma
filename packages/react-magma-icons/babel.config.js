const babelConfig = require('../../babel.config');

module.exports = function (api) {
  return {
    ...babelConfig(api),
  };
};
