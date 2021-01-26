const path = require('path');
const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../packages/**/src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-addon-performance/register',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-controls',
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
        },
      },
    };
  },
};
