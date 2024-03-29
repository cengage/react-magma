module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ['emotion', { autoLabel: true }],
      [
        '@emotion',
        {
          importMap: {
            '@emotion/styled': {
              default: {
                canonicalImport: ['@emotion/styled', 'default'],
                styledBaseImport: [
                  '@emotion/styled/base/dist/emotion-styled-base.esm.js',
                  'default',
                ],
              },
            },
          },
        },
      ],
    ],
    env: {
      test: {
        plugins: ['dynamic-import-node'],
        presets: [
          '@babel/preset-react',
          '@babel/preset-typescript',
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: '3.*.*',
            },
          ],
        ],
      },
    },
  };
};
