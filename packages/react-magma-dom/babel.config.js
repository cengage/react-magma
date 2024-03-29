const babelConfig = require('../../babel.config');

const path = require('path');
const emotionPkg = require('@emotion/styled/base/package.json');
const styledBaseImport = [
  '@emotion/styled/base/' + path.normalize(emotionPkg.module),
  'default',
];

module.exports = function (api) {
  return {
    ...babelConfig(api),
    plugins: [
      [
        '@emotion',
        {
          importMap: {
            '@emotion/styled': {
              default: {
                canonicalImport: ['@emotion/styled', 'default'],
                styledBaseImport,
              },
            },
          },
        },
      ],
      [
        '@emotion/babel-preset-css-prop',
        {
          autoLabel: 'always',
          labelFormat: '[local]',
          useBuiltIns: false,
          throwIfNamespace: true,
          importMap: {
            '@emotion/styled': {
              default: {
                canonicalImport: ['@emotion/styled', 'default'],
                styledBaseImport,
              },
            },
          },
        },
      ],
    ],
  };
};
