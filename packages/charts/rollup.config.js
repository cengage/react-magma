import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

const builds = [
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/charts.modern.module.js',
      format: 'es',
      sourcemap: true,
    },
    external: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      'react-magma-dom',
      'react-magma-icons',
      '@carbon/charts-react',
      'd3',
      'd3-cloud',
      'd3-sankey',
      'victory',
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declarationDir: 'dist',
      }),
      postcss({
        inject: true,
        minimize: true,
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/charts.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      'react-magma-dom',
      'react-magma-icons',
      '@carbon/charts-react',
      'd3',
      'd3-cloud',
      'd3-sankey',
      'victory',
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      postcss({
        inject: true,
        minimize: true,
      }),
    ],
  },
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/charts.umd.js',
      format: 'umd',
      name: 'ReactMagmaCharts',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@emotion/react': 'EmotionReact',
        '@emotion/styled': 'EmotionStyled',
        '@carbon/charts-react': 'CarbonChartsReact',
      },
    },
    external: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      '@carbon/charts-react',
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      postcss({
        inject: true,
        minimize: true,
      }),
    ],
  },
];

export default builds;
