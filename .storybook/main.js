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
    '@storybook/addon-essentials',
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async config => {
    config.module.rules[0].exclude = /node_modules\/(?!(@carbon)\/).*/;

    config.module.rules.push({
      test: /node_modules\/(uuid|victory.*?)\/.*\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-optional-chaining',
            '@babel/plugin-transform-nullish-coalescing-operator',
            '@babel/plugin-transform-logical-assignment-operators',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    });

    return {
      ...config,
      module: {
        ...config.module,
      },
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
