const fs = require('fs');

module.exports = {
  rollup(config) {
    if (config.output.format !== 'esm') {
      return config;
    }

    let input = {};

    const components = fs.readdirSync('src/components');
    const icons = fs.readdirSync('src/components/Icon/types');
    const themeFiles = fs.readdirSync('src/theme');
    // const utilsFiles = fs.readdirSync('src/utils');

    components.forEach(component => {
      if (component === 'UtilityStyles.tsx') {
        input[`components/${component}`] = `src/components/${component}`;
        return;
      }

      if (component !== 'SelectionControls') {
        input[`components/${component}/index`] =
          component === 'Icon'
            ? `src/components/${component}/index.ts`
            : `src/components/${component}/index.tsx`;
      }

      const files = fs.readdirSync(`src/components/${component}`);

      files.forEach(file => {
        const splitFile = file.split('.');
        if (
          (file !== 'index' && splitFile[1] === 'tsx') ||
          splitFile[1] === 'ts'
        ) {
          input[
            `components/${component}/${splitFile[0]}`
          ] = `src/components/${component}/${file}`;
        }
      });
    });

    icons.forEach(icon => {
      input[
        `components/Icon/types/${icon.split('.')[0]}`
      ] = `src/components/Icon/types/${icon}`;
    });

    themeFiles.forEach(themeFile => {
      const splitThemeFile = themeFile.split('.');

      if (splitThemeFile.length === 1) {
        const subFiles = fs.readdirSync(`src/theme/${themeFile}`);

        subFiles.forEach(subFile => {
          const splitSubFile = subFile.split('.');
          if (splitSubFile[1] === 'tsx' || splitSubFile[1] === 'ts') {
            input[
              `theme/${themeFile}/${splitSubFile[0]}`
            ] = `src/theme/${themeFile}/${subFile}`;
          }
        });
        return;
      }

      if (splitThemeFile[1] === 'tsx' || splitThemeFile[1] === 'ts') {
        input[`theme/${splitThemeFile[0]}`] = `src/theme/${themeFile}`;
      }
    });

    // utilsFiles.forEach(utilFile => {
    //   const splitUtilFile = utilFile.split('.');

    //   if (splitUtilFile[1] === 'tsx' || splitUtilFile[1] === 'ts') {
    //     input[`utils/${splitUtilFile[0]}`] = `src/utils/${utilFile}`;
    //   }
    // });

    const overrides = {
      input,
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
        'react-select',
        '@emotion/core',
        '@emotion/styled',
        '@emotion/styled-base',
        '@emotion/serialize',
        'prop-types',
        'react-input-autosize'
      ]
    };

    return { ...config, ...overrides };
  }
};
