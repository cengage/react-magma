import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/bundle.js',
        format: 'cjs'
      },
      {
        file: 'dist/esBundle.js',
        format: 'esm'
      },
      {
        name: 'umdBundle',
        file: 'dist/umdBundle.js',
        format: 'umd'
      }
    ],
    external: ['react', 'react-dom', 'styled-components'],
    plugins: [
      postcss({
        extensions: ['.css'],
        plugins: [url]
      }),
      resolve(),
      typescript(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
];
