module.exports = function (api) {
  const isBabelLoader = api.caller(
    caller => !!(caller && caller.name === 'babel-loader')
  );

  if (!isBabelLoader) {
    api.cache.using(() => process.env.NODE_ENV);
  }

  const isTest = api.env('test');

  const presets = [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        corejs: false,
        modules: false,
      },
    ],
  ];

  const plugins = [['@emotion', { autoLabel: 'always' }]];

  if (isTest) {
    plugins.push('dynamic-import-node');
    const presetEnvConfig = presets.find(
      p => Array.isArray(p) && p[0] === '@babel/preset-env'
    );

    if (presetEnvConfig && presetEnvConfig[1]) {
      presetEnvConfig[1].modules = 'auto';
    }
  }

  return {
    presets,
    plugins,
  };
};
