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
      external: [
        'react',
        'react-dom',
        'date-fns',
        'downshift',
        'react-select',
        '@emotion/core',
        '@emotion/styled',
        '@emotion/styled-base',
        '@emotion/serialize',
        'prop-types',
        'react-input-autosize',
        'react-loadable',
        'react-magma-icons'
      ]
    };

    return { ...config, ...overrides };
  }
};
