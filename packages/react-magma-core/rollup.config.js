import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const base = {
  input: 'src/index.ts',
  external: ['react', 'styled-components', 'react-select'],
  plugins: [
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.json']
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx']
    }),
    terser()
  ]
};

export default [
  {
    ...base,
    output: {
      file: pkg.main,
      format: 'cjs',
      globals: {
        react: 'React'
      }
    }
  },
  {
    ...base,
    output: {
      file: pkg.module,
      format: 'esm',
      globals: {
        react: 'React'
      }
    }
  },
  {
    ...base,
    output: {
      name: 'umdBundle',
      file: 'dist/umdBundle.js',
      format: 'umd',
      globals: {
        react: 'React'
      }
    }
  }
];
