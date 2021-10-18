module.exports = ({ actions, stage, plugins }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({ process: 'process/browser' }),
        plugins.provide({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
      resolve: {
        fallback: {
          // assert: require.resolve('assert'),
          fs: false,
          path: require.resolve('path-browserify'),
        },
      },
    });
  } else {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
      resolve: {
        fallback: {
          // assert: require.resolve('assert'),
          fs: false,
          path: require.resolve('path-browserify'),
        },
      },
    });
  }
};