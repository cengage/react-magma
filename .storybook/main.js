import { dirname, join } from 'path';

const path = require('path');

const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    '../packages/react-magma-dom/src/components/**/*.stories.tsx',
    '../packages/charts/src/components/**/*.stories.tsx',
    '../packages/dropzone/src/components/**/*.stories.tsx',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
  ],

  typescript: {
    reactDocgen: false,
  },

  webpackFinal: async config => {
    config.module.rules[0].exclude = /node_modules\/(?!(@carbon)\/).*/;

    config.module.rules.push({
      test: /node_modules\/(framer-motion|motion-dom|uuid)\/.*\.(js|mjs)$/,
      type: 'javascript/auto',
      use: {
        loader: 'babel-loader',
        options: {
          sourceType: 'unambiguous',
        },
      },
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'react-magma-dom': toPath('packages/react-magma-dom/src'),
      },
    };

    return config;
  },

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  docs: {},
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
