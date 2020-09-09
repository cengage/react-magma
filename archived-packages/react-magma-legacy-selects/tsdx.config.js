const commonjs = require('@rollup/plugin-commonjs');

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
        'react-select',
        'react-select',
        '@emotion/core',
        '@emotion/styled',
        '@emotion/styled-base',
        '@emotion/serialize',
        'prop-types',
        'react-is',
        'react-input-autosize',
        'react-loadable',
        'react-magma-icons',
        'uuid'
      ],
      plugins: [
        ...config.plugins,
        commonjs({
          include: 'node_modules/**'
        })
      ]
    };

    return { ...config, ...overrides };
  }
};
