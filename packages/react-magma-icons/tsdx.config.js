module.exports = {
  rollup(config) {
    if (config.output.format !== 'esm') {
      return config;
    }
    const overrides = {
      preserveModules: true,
      output: {
        ...config.output,
        file: null,
        dir: 'dist',
        entryFileNames: '[name].esm.js',
      },
    };

    return { ...config, ...overrides };
  },
};
