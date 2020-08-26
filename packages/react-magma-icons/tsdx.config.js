module.exports = {
  rollup(config) {
    if (config.output.format !== 'esm') {
      return config;
    }
    const overrides = {
      output: {
        ...config.output,
        file: null,
        dir: 'dist',
        entryFileNames: 'esm/[name].js'
      },
      external: ['@types/react', '@types/react-dom', 'react', 'react-dom']
    };

    return { ...config, ...overrides };
  }
};
