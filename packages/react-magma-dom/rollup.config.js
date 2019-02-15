import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { plugin as analyze } from 'rollup-plugin-analyzer';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import pkg from './package.json';

const base = {
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
  plugins: [
    postcss({
      extensions: ['.css'],
      plugins: [url]
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.json']
    }),
    commonJS({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx']
    }),
    terser(),
    analyze()
  ]
};

export default [
  {
    ...base,
    output: {
      file: pkg.main,
      format: 'cjs',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-select': 'ReactSelect'
      }
    },
    plugins: [
      ...base.plugins,
      visualizer({ filename: './dist/reports/esm_stats.html' })
    ]
  },
  {
    ...base,
    output: {
      file: pkg.module,
      format: 'esm',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-select': 'ReactSelect'
      }
    },
    plugins: [
      ...base.plugins,
      visualizer({ filename: './dist/reports/esm_stats.html' })
    ]
  },
  {
    ...base,
    output: {
      name: 'umdBundle',
      file: 'dist/umdBundle.js',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-select': 'ReactSelect'
      }
    },
    plugins: [
      ...base.plugins,
      visualizer({ filename: './dist/reports/umd_stats.html' })
    ]
  }
];
