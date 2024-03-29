const babelConfig = require('../../babel.config')

module.exports = function(api) {
  return {
    ...babelConfig(api), 
    plugins: [
      [
        '@emotion',
        {
          importMap: {
            '@emotion/styled': {
              default: {
                canonicalImport: ['@emotion/styled', 'default']
              },
            },
          },
        },
      ],
    ],
  }
}
