const path = require('path');
const { convertCompilerOptionsFromJson } = require('typescript');
const toPath = _path => path.join(process.cwd(), _path);
const babelConfig = require('../babel.config');

module.exports = {
  stories: [
    '../packages/react-magma-dom/src/components/**/*.stories.tsx',
    '../packages/charts/src/components/**/*.stories.tsx',
    '../packages/dropzone/src/components/**/*.stories.tsx',
    '../packages/schema-renderer/src/components/**/*.stories.tsx',
    '../patterns/header/src/components/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-controls',
    '@storybook/addon-measure',
  ],
  typescript: {
    reactDocgen: false,
    // check: true,
  },
  webpackFinal: async config => {
    return {
      ...config,
      // devtool: 'eval',
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          'react-magma-dom': toPath('packages/react-magma-dom/src'),
        },
      },
    };
  },
};
